import { useState, useEffect } from 'react';
import { Project, getProjects } from '../lib/api';

export function useProjects(search?: string, tags?: string[]) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects({ search, tags });
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [search, tags?.join(',')]);

  return { projects, loading, error };
}