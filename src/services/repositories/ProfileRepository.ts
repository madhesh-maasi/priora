import { supabase } from '@/services/supabaseClient';
import { Profile } from '@/types/database';
import { BaseRepository } from './base';

export interface IProfileRepository {
  getById(id: string): Promise<Profile | null>;
  getCurrent(): Promise<Profile | null>;
  update(id: string, updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<Profile>;
}

export class ProfileRepository extends BaseRepository implements IProfileRepository {
  async getById(id: string): Promise<Profile | null> {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw this.handleError(error);
    }

    return data as Profile;
  }

  async getCurrent(): Promise<Profile | null> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return null;

    return this.getById(user.id);
  }

  async update(id: string, updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<Profile> {
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', id).select().single();

    if (error) throw this.handleError(error);
    return data as Profile;
  }
}
