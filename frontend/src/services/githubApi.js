const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'W-Mirshod';

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
    size: repo.size
  };
};

export const fetchUserRepositories = async (page = 1, perPage = 100) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${USERNAME}/repos?sort=updated&direction=desc&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repositories = await response.json();
    
    const repositoriesWithLanguages = await Promise.all(
      repositories.map(async (repo) => {
        try {
          const languagesResponse = await fetch(repo.languages_url, {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Portfolio-App'
            }
          });
          
          if (languagesResponse.ok) {
            const languages = await languagesResponse.json();
            return { ...repo, languages };
          }
        } catch (error) {
          console.warn(`Failed to fetch languages for ${repo.name}:`, error);
        }
        
        return { ...repo, languages: {} };
      })
    );

    return repositoriesWithLanguages.map(formatRepositoryData);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

export const fetchRepositoryDetails = async (repoName) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
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
        'User-Agent': 'Portfolio-App'
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
