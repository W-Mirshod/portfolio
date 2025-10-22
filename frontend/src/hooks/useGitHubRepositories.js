import { useState, useEffect, useCallback } from 'react';
import { fetchUserRepositories } from '../services/githubApi';

export const useGitHubRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('commits');

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

  const sortRepositories = useCallback((repos, sortType) => {
    const sorted = [...repos];
    
    switch (sortType) {
      case 'stars':
        return sorted.sort((a, b) => b.stars - a.stars);
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'created':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'commits':
        return sorted.sort((a, b) => (b.commitCount || 0) - (a.commitCount || 0));
      case 'updated':
      default:
        return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
  }, []);

  const loadRepositories = useCallback(async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchUserRepositories(pageNum, 30);
      
      let newRepositories;
      if (append) {
        newRepositories = [...repositories, ...data];
      } else {
        newRepositories = data;
      }
      
      const sorted = sortRepositories(newRepositories, sortBy);
      const filtered = filterRepositories(sorted, filter);
      
      setRepositories(sorted);
      setFilteredRepositories(filtered);
      setHasMore(data.length === 30);
      setPage(pageNum);
    } catch (err) {
      // Only set error if we don't have any repositories (fallback failed too)
      if (repositories.length === 0) {
        setError(err.message);
      }
      console.error('Failed to load repositories:', err);
    } finally {
      setLoading(false);
    }
  }, [repositories, sortBy, filter, sortRepositories, filterRepositories]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadRepositories(page + 1, true);
    }
  }, [loading, hasMore, page, loadRepositories]);

  const refresh = useCallback(() => {
    loadRepositories(1, false);
  }, [loadRepositories]);

  const applyFilter = useCallback((filterType) => {
    setFilter(filterType);
    const filtered = filterRepositories(repositories, filterType);
    setFilteredRepositories(filtered);
  }, [repositories, filterRepositories]);

  const applySort = useCallback((sortType) => {
    setSortBy(sortType);
    const sorted = sortRepositories(repositories, sortType);
    const filtered = filterRepositories(sorted, filter);
    setRepositories(sorted);
    setFilteredRepositories(filtered);
  }, [repositories, filter, sortRepositories, filterRepositories]);

  useEffect(() => {
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
    error,
    hasMore,
    filter,
    sortBy,
    loadMore,
    refresh,
    applyFilter,
    applySort
  };
};