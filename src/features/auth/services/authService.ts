import { supabase } from '@/services/supabaseClient';
import { AuthUser, SignUpCredentials, SignInCredentials } from '../types/auth.types';

export class AuthService {
  async signUp(credentials: SignUpCredentials): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          display_name: credentials.displayName,
        },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error('Sign up failed');

    return data.user as AuthUser;
  }

  async signIn(credentials: SignInCredentials): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Sign in failed');

    return data.user as AuthUser;
  }

  async signInWithGoogle(): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.REACT_NATIVE_SUPABASE_URL}/auth/v1/callback`,
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error('Google sign in failed');

    return data.user as AuthUser;
  }

  async signInWithApple(): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${process.env.REACT_NATIVE_SUPABASE_URL}/auth/v1/callback`,
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error('Apple sign in failed');

    return data.user as AuthUser;
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.REACT_NATIVE_SUPABASE_URL}/auth/reset-password`,
    });

    if (error) throw error;
  }

  async confirmPasswordReset(password: string, token: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) throw error;
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return (user as AuthUser) || null;
  }

  async getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      callback((session?.user as AuthUser) || null);
    });

    return subscription;
  }
}

export const authService = new AuthService();
