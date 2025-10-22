import { useState, useEffect, useCallback } from 'react';
import { fetchUserRepositories, getCachedRepositories, clearCache } from '../services/githubApi';

export const useGitHubRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('commits');
  const [loadingMore, setLoadingMore] = useState(false);

  const PER_PAGE = 7;

  const filterRepositories = useCallback((repos, filterType) => {
    if (filterType === 'all') return repos;
    
    return repos.filter(repo => {
      const name = repo.title.toLowerCase();
      const description = repo.description.toLowerCase();
      const technologies = repo.technologies.join(' ').toLowerCase();
      
      switch (filterType) {
        case 'web':
          return name.includes('web') || name.includes('website') || 
                 description.includes('web') || technologies.includes('html') || 
                 technologies.includes('css') || technologies.includes('javascript');
        case 'mobile':
          return name.includes('mobile') || name.includes('app') || 
                 technologies.includes('react native') || technologies.includes('flutter');
        case 'ai':
          return name.includes('ai') || name.includes('gpt') || name.includes('neural') ||
                 description.includes('ai') || description.includes('machine learning') ||
                 technologies.includes('ai') || technologies.includes('pytorch');
        case 'api':
          return name.includes('api') || description.includes('api') ||
                 technologies.includes('rest') || technologies.includes('api');
        case 'python':
          return technologies.includes('python');
        case 'javascript':
          return technologies.includes('javascript') || technologies.includes('typescript');
        case 'popular':
          return repo.stars > 0;
        default:
          return true;
      }
    });
  }, []);


  const loadRepositories = useCallback(async (pageNum = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      // Try to get from cache first
      const cachedData = getCachedRepositories(pageNum, PER_PAGE);
      if (cachedData && cachedData.length > 0) {
        console.log(`Using cached data for page ${pageNum}`);
        let newRepositories;
        if (append) {
          newRepositories = [...repositories, ...cachedData];
        } else {
          newRepositories = cachedData;
        }
        
        const filtered = filterRepositories(newRepositories, filter);
        
        setRepositories(newRepositories);
        setFilteredRepositories(filtered);
        setHasMore(cachedData.length === PER_PAGE);
        setPage(pageNum);
        return;
      }
      
      // Fetch from API if not in cache
      const data = await fetchUserRepositories(pageNum, PER_PAGE);
      
      let newRepositories;
      if (append) {
        newRepositories = [...repositories, ...data];
      } else {
        newRepositories = data;
      }
      
      const filtered = filterRepositories(newRepositories, filter);
      
      setRepositories(newRepositories);
      setFilteredRepositories(filtered);
      setHasMore(data.length === PER_PAGE);
      setPage(pageNum);
    } catch (err) {
      // Only set error if we don't have any repositories (fallback failed too)
      if (repositories.length === 0) {
        setError(err.message);
      }
      console.error('Failed to load repositories:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [repositories, filter, filterRepositories]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      loadRepositories(page + 1, true);
    }
  }, [loadingMore, hasMore, page, loadRepositories]);

  const refresh = useCallback(() => {
    clearCache();
    loadRepositories(1, false);
  }, [loadRepositories]);

  const applyFilter = useCallback((filterType) => {
    setFilter(filterType);
    const filtered = filterRepositories(repositories, filterType);
    setFilteredRepositories(filtered);
  }, [repositories, filterRepositories]);

  useEffect(() => {
    // Clear cache to ensure fresh data with new commit counting
    clearCache();
    loadRepositories(1, false);
  }, []);

  useEffect(() => {
    const filtered = filterRepositories(repositories, filter);
    setFilteredRepositories(filtered);
  }, [repositories, filter, filterRepositories]);

  return {
    repositories: filteredRepositories,
    allRepositories: repositories,
    loading,
    loadingMore,
    error,
    hasMore,
    filter,
    sortBy,
    loadMore,
    refresh,
    applyFilter
  };
};