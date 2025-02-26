import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';

/**
 * Type definition for the deceased person data
 */
interface Deceased {
  id: number;
  name: string;
  dateOfDeath: string;
  description?: string;
  createdAt: string;
}

/**
 * Hook to fetch and manage memorial data
 */
export function useMemorial() {
  const [deceased, setDeceased] = useState<Deceased[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeceased = async () => {
      try {
        console.log('Fetching deceased data...');
        setLoading(true);
        const response = await fetch('/api/deceased');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch deceased data: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Deceased data fetched successfully:', data.length, 'records');
        setDeceased(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching deceased data:', errorMessage);
        Sentry.captureException(err);
        setError('Failed to load memorial data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeceased();
  }, []);

  return { deceased, loading, error };
}