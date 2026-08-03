import { supabase } from '@/services/supabaseClient';
import type { AuthUser, SignUpCredentials, SignInCredentials } from '../types/auth.types';

class AuthService {
  async signUp(credentials: SignUpCredentials): Promise<AuthUser> {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: { displayName: credentials.displayName },
      },
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Failed to create user');

    const user: AuthUser = {
      id: authData.user.id,
      email: authData.user.email || credentials.email,
      displayName: credentials.displayName,
      createdAt: authData.user.created_at,
      updatedAt: authData.user.updated_at,
    };

    return user;
  }

  async signIn(credentials: SignInCredentials): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Failed to sign in');

    const user: AuthUser = {
      id: data.user.id,
      email: data.user.email || credentials.email,
      displayName: data.user.user_metadata?.displayName,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at,
    };

    return user;
  }

  async signInWithGoogle(): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:8081/auth/callback',
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Failed to sign in with Google');

    const user: AuthUser = {
      id: data.user.id,
      email: data.user.email || '',
      displayName: data.user.user_metadata?.full_name,
      avatar: data.user.user_metadata?.avatar_url,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at,
    };

    return user;
  }

  async signInWithApple(): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: 'http://localhost:8081/auth/callback',
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Failed to sign in with Apple');

    const user: AuthUser = {
      id: data.user.id,
      email: data.user.email || '',
      displayName: data.user.user_metadata?.full_name,
      avatar: data.user.user_metadata?.avatar_url,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at,
    };

    return user;
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:8081/auth/reset-password',
    });
    if (error) throw new Error(error.message);
  }

  async confirmPassword(newPassword: string, token: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw new Error(error.message);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;

    return {
      id: data.user.id,
      email: data.user.email || '',
      displayName: data.user.user_metadata?.displayName,
      avatar: data.user.user_metadata?.avatar_url,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at,
    };
  }

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email || '',
          displayName: session.user.user_metadata?.displayName,
          avatar: session.user.user_metadata?.avatar_url,
          createdAt: session.user.created_at,
          updatedAt: session.user.updated_at,
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  }
}

export const authService = new AuthService();
