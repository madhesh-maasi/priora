import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface Session {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  token_type: string;
  user: { id: string; email: string } | null;
}

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initSession = async () => {
      try {
        const currentSession = await authService.getSession();
        setSession(currentSession);

        unsubscribe = authService.onAuthStateChange(() => {
          authService.getSession().then(newSession => {
            setSession(newSession);
          });
        });
      } finally {
        setIsLoading(false);
      }
    };

    initSession();

    return () => {
      unsubscribe?.();
    };
  }, []);

  return { session, isLoading };
};
