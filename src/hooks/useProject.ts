import { useState, useEffect } from 'react';
import { Project, getProjectById } from '../lib/api';

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProjectById(id);
        setProject(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
}