const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'W-Mirshod';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || 'TOKEN_NOT_SET';

// Session Storage Cache
const CACHE_KEY = 'github_repos_session';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const getCachedRepos = () => {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('Using cached repositories from session storage');
        return data;
      } else {
        // Cache expired, clear it
        sessionStorage.removeItem(CACHE_KEY);
        console.log('Cache expired, cleared session storage');
      }
    }
  } catch (error) {
    console.warn('Failed to read from session storage:', error);
  }
  return null;
};

const setCachedRepos = (repos) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
      data: repos,
      timestamp: Date.now()
    }));
    console.log('Cached repositories to session storage');
  } catch (error) {
    console.warn('Failed to write to session storage:', error);
  }
};

const languageIcons = {
  'JavaScript': 'fab fa-js-square',
  'TypeScript': 'fab fa-js-square',
  'Python': 'fab fa-python',
  'Java': 'fab fa-java',
  'C++': 'fas fa-code',
  'C#': 'fas fa-code',
  'Go': 'fab fa-golang',
  'Rust': 'fas fa-code',
  'PHP': 'fab fa-php',
  'Ruby': 'fas fa-gem',
  'Swift': 'fab fa-swift',
  'Kotlin': 'fas fa-code',
  'HTML': 'fab fa-html5',
  'CSS': 'fab fa-css3-alt',
  'SCSS': 'fab fa-sass',
  'Vue': 'fab fa-vuejs',
  'React': 'fab fa-react',
  'Angular': 'fab fa-angular',
  'Node.js': 'fab fa-node-js',
  'Docker': 'fab fa-docker',
  'Shell': 'fas fa-terminal',
  'PowerShell': 'fas fa-terminal',
  'Other': 'fas fa-code'
};

const categoryIcons = {
  'portfolio': 'fas fa-user',
  'web': 'fas fa-globe',
  'mobile': 'fas fa-mobile-alt',
  'ai': 'fas fa-robot',
  'bot': 'fas fa-robot',
  'api': 'fas fa-plug',
  'library': 'fas fa-book',
  'tool': 'fas fa-tools',
  'game': 'fas fa-gamepad',
  'data': 'fas fa-database',
  'ml': 'fas fa-brain',
  'cv': 'fas fa-eye',
  'iot': 'fas fa-microchip',
  'blockchain': 'fas fa-link',
  'crypto': 'fas fa-coins',
  'default': 'fas fa-code'
};

const getCategoryFromName = (name) => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('portfolio')) return 'portfolio';
  if (lowerName.includes('web') || lowerName.includes('website')) return 'web';
  if (lowerName.includes('mobile') || lowerName.includes('app')) return 'mobile';
  if (lowerName.includes('ai') || lowerName.includes('gpt') || lowerName.includes('neural')) return 'ai';
  if (lowerName.includes('bot') || lowerName.includes('telegram')) return 'bot';
  if (lowerName.includes('api') || lowerName.includes('rest')) return 'api';
  if (lowerName.includes('library') || lowerName.includes('lib')) return 'library';
  if (lowerName.includes('tool') || lowerName.includes('utility')) return 'tool';
  if (lowerName.includes('game')) return 'game';
  if (lowerName.includes('data') || lowerName.includes('analytics')) return 'data';
  if (lowerName.includes('ml') || lowerName.includes('machine')) return 'ml';
  if (lowerName.includes('cv') || lowerName.includes('vision') || lowerName.includes('yolo')) return 'cv';
  if (lowerName.includes('iot') || lowerName.includes('sensor')) return 'iot';
  if (lowerName.includes('blockchain') || lowerName.includes('crypto')) return 'blockchain';
  
  return 'default';
};

const getIconFromLanguages = (languages) => {
  if (!languages || Object.keys(languages).length === 0) {
    return languageIcons['Other'];
  }
  
  const primaryLanguage = Object.keys(languages)[0];
  return languageIcons[primaryLanguage] || languageIcons['Other'];
};

const formatRepositoryData = (repo) => {
  const languages = repo.languages || {};
  const primaryLanguage = Object.keys(languages)[0] || 'Other';
  const category = getCategoryFromName(repo.name);
  
  return {
    id: repo.id,
    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'No description available',
    icon: categoryIcons[category],
    technologies: Object.keys(languages).slice(0, 5),
    url: repo.html_url,
    githubUrl: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: primaryLanguage,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    topics: repo.topics || [],
    isPrivate: repo.private,
    hasPages: repo.has_pages,
    size: repo.size,
    commitCount: repo.commit_count || 0
  };
};

// Fetch all repositories once and cache them sorted by commits
export const fetchAllRepositoriesSorted = async () => {
  try {
    // Check if we already have cached sorted data
    const cached = getCachedRepos();
    if (cached) {
      console.log('Using cached sorted repositories');
      return cached;
    }

    console.log('Fetching all repositories to sort by commits...');
    
    // Fetch all repositories
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
          ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
        }
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        console.warn('GitHub API rate-limited or forbidden. Using fallback data.');
        return getFallbackRepositories().sort((a, b) => (b.commitCount || 0) - (a.commitCount || 0));
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repositories = await response.json();
    
    const repositoriesWithLanguages = await Promise.all(
      repositories.map(async (repo) => {
        try {
          const [languagesResponse, statsResponse] = await Promise.all([
            fetch(repo.languages_url, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-App',
                ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
              }
            }),
            fetch(`${GITHUB_API_BASE}/repos/${repo.owner.login}/${repo.name}/stats/contributors`, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-App',
                ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
              }
            })
          ]);

          let languages = {};
          let commitCount = 0;

          if (languagesResponse.ok) {
            languages = await languagesResponse.json();
          }

          if (statsResponse.ok) {
            const stats = await statsResponse.json();
            // Sum up all commits from all contributors
            if (stats && Array.isArray(stats)) {
              commitCount = stats.reduce((total, contributor) => {
                return total + (contributor.total || 0);
              }, 0);
            }
          } else {
            // Fallback: try to get commit count from commits API
            try {
              const commitsResponse = await fetch(`${repo.url}/commits?per_page=1`, {
                headers: {
                  'Accept': 'application/vnd.github.v3+json',
                  'User-Agent': 'Portfolio-App',
                  ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
                }
              });

              if (commitsResponse.ok) {
                const linkHeader = commitsResponse.headers.get('Link');
                if (linkHeader) {
                  const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
                  if (lastPageMatch) {
                    commitCount = parseInt(lastPageMatch[1]);
                  }
                } else {
                  // If no pagination, count commits in this response
                  const commits = await commitsResponse.json();
                  commitCount = commits.length;
                }
              }
            } catch (error) {
              console.warn(`Failed to fetch commit count for ${repo.name}:`, error);
            }
          }
          
          return { ...repo, languages, commit_count: commitCount };
        } catch (error) {
          console.warn(`Failed to fetch data for ${repo.name}:`, error);
        }
        
        return { ...repo, languages: {}, commit_count: 0 };
      })
    );

    const formattedRepos = repositoriesWithLanguages.map(formatRepositoryData);
    
    // Sort by commit count (most commits first)
    const sortedRepos = formattedRepos.sort((a, b) => (b.commitCount || 0) - (a.commitCount || 0));

    // Log the sorted repositories with commit counts
    console.log('Repositories sorted by commit count:');
    sortedRepos.forEach(repo => {
      console.log(`${repo.title}: ${repo.commitCount} commits`);
    });

    // Cache all repositories sorted by commits
    setCachedRepos(sortedRepos);
    
    return sortedRepos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    console.warn('Falling back to static data due to API error.');
    return getFallbackRepositories().sort((a, b) => (b.commitCount || 0) - (a.commitCount || 0));
  }
};

export const fetchUserRepositories = async (page = 1, perPage = 7) => {
  try {
    // Get all sorted repositories
    const allRepos = await fetchAllRepositoriesSorted();
    
    // Return the requested page
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pageData = allRepos.slice(startIndex, endIndex);

    // Add pagination metadata
    pageData._hasMore = endIndex < allRepos.length;
    pageData._totalPages = Math.ceil(allRepos.length / perPage);
    pageData._currentPage = page;

    return pageData;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    console.warn('Falling back to static data due to API error.');
    const fallback = getFallbackRepositories().sort((a, b) => (b.commitCount || 0) - (a.commitCount || 0));
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pageData = fallback.slice(startIndex, endIndex);

    pageData._hasMore = endIndex < fallback.length;
    pageData._totalPages = Math.ceil(fallback.length / perPage);
    pageData._currentPage = page;

    return pageData;
  }
};

export const fetchRepositoryDetails = async (repoName) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
          ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repo = await response.json();
    
    const languagesResponse = await fetch(repo.languages_url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
        ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
      }
    });
    
    const languages = languagesResponse.ok ? await languagesResponse.json() : {};
    
    return formatRepositoryData({ ...repo, languages });
  } catch (error) {
    console.error('Error fetching repository details:', error);
    throw error;
  }
};

export const getLanguageIcon = (language) => {
  return languageIcons[language] || languageIcons['Other'];
};

export const getCategoryIcon = (category) => {
  return categoryIcons[category] || categoryIcons['default'];
};

// Get cached repositories for pagination
export const getCachedRepositories = (page = 1, perPage = 7) => {
  const cached = getCachedRepos();
  if (cached) {
    // Sort by commit count (most commits first)
    const sortedCached = cached.sort((a, b) => (b.commitCount || 0) - (a.commitCount || 0));
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pageData = sortedCached.slice(startIndex, endIndex);

    // Add pagination metadata
    pageData._hasMore = endIndex < sortedCached.length;
    pageData._totalPages = Math.ceil(sortedCached.length / perPage);
    pageData._currentPage = page;

    return pageData;
  }
  return null;
};

export const clearCache = () => {
  try {
    sessionStorage.removeItem(CACHE_KEY);
    console.log('Manually cleared cache');
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
};

const getFallbackRepositories = () => {
  return [
    {
      id: 1,
      title: 'For Exam',
      description: '1,2,3,4,5,6,7 => Tasks of the exam ||| 8 => changing database ||| 9 => Edit decorators in getting requests file',
      icon: 'fas fa-code',
      technologies: ['Python', 'JavaScript'],
      url: 'https://github.com/W-Mirshod/for-exam',
      githubUrl: 'https://github.com/W-Mirshod/for-exam',
      stars: 0,
      forks: 0,
      language: 'Python',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      topics: [],
      isPrivate: false,
      hasPages: false,
      size: 0,
      commitCount: 127
    },
    {
      id: 2,
      title: 'IsOpen Backend',
      description: 'No description available',
      icon: 'fas fa-server',
      technologies: ['JavaScript', 'Node.js'],
      url: 'https://github.com/W-Mirshod/isopen-backend',
      githubUrl: 'https://github.com/W-Mirshod/isopen-backend',
      stars: 0,
      forks: 0,
      language: 'JavaScript',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      topics: [],
      isPrivate: false,
      hasPages: false,
      size: 0,
      commitCount: 89
    },
    {
      id: 3,
      title: 'Automatic Raspberry Pi',
      description: 'No description available',
      icon: 'fab fa-raspberry-pi',
      technologies: ['Python', 'Linux'],
      url: 'https://github.com/W-Mirshod/automatic-raspberry-pi',
      githubUrl: 'https://github.com/W-Mirshod/automatic-raspberry-pi',
      stars: 0,
      forks: 0,
      language: 'Python',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      topics: [],
      isPrivate: false,
      hasPages: false,
      size: 0,
      commitCount: 67
    },
    {
      id: 4,
      title: 'Data Structures',
      description: 'No description available',
      icon: 'fas fa-database',
      technologies: ['Python', 'C++'],
      url: 'https://github.com/W-Mirshod/data-structures',
      githubUrl: 'https://github.com/W-Mirshod/data-structures',
      stars: 0,
      forks: 0,
      language: 'Python',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      topics: [],
      isPrivate: false,
      hasPages: false,
      size: 0,
      commitCount: 45
    },
    {
      id: 5,
      title: 'Encryption Decryption',
      description: 'doing encryption and decryption with a quite simple GUI',
      icon: 'fas fa-lock',
      technologies: ['Python'],
      url: 'https://github.com/W-Mirshod/encryption-decryption',
      githubUrl: 'https://github.com/W-Mirshod/encryption-decryption',
      stars: 0,
      forks: 0,
      language: 'Python',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      topics: [],
      isPrivate: false,
      hasPages: false,
      size: 0,
      commitCount: 34
    },
    {
      id: 6,
      title: 'NotePad',
      description: 'No description available',
      icon: 'fas fa-sticky-note',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      url: 'https://github.com/W-Mirshod/notepad',
      githubUrl: 'https://github.com/W-Mirshod/notepad',
      stars: 0,
      forks: 0,
      language: 'JavaScript',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      topics: [],
      isPrivate: false,
      hasPages: false,
      size: 0,
      commitCount: 12
    }
  ];
};
