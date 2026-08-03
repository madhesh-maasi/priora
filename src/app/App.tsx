import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useAuth } from '@/features/auth';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AppNavigator } from './navigation/AppNavigator';

export const App: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Show splash screen here
  }

  return (
    <QueryClientProvider client={queryClient}>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </QueryClientProvider>
  );
};

export default App;
