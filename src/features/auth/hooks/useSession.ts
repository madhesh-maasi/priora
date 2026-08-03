import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { authService } from '../services/authService';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      try {
        const currentSession = await authService.getSession();
        setSession(currentSession);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();

    const subscription = authService.onAuthStateChange((user) => {
      if (user) {
        const initSession = async () => {
          const currentSession = await authService.getSession();
          setSession(currentSession);
        };
        initSession();
      } else {
        setSession(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { session, isLoading };
}
