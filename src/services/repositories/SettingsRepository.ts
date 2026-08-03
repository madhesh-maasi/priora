import { supabase } from '@/services/supabaseClient';
import { UserSettings } from '@/types/database';
import { BaseRepository } from './base';

export interface ISettingsRepository {
  getByUserId(userId: string): Promise<UserSettings | null>;
  getCurrent(): Promise<UserSettings | null>;
  update(id: string, updates: Partial<Omit<UserSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<UserSettings>;
}

export class SettingsRepository extends BaseRepository implements ISettingsRepository {
  async getByUserId(userId: string): Promise<UserSettings | null> {
    const { data, error } = await supabase.from('user_settings').select('*').eq('user_id', userId).single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw this.handleError(error);
    }

    return data as UserSettings;
  }

  async getCurrent(): Promise<UserSettings | null> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return null;

    return this.getByUserId(user.id);
  }

  async update(
    id: string,
    updates: Partial<Omit<UserSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>,
  ): Promise<UserSettings> {
    const { data, error } = await supabase.from('user_settings').update(updates).eq('id', id).select().single();

    if (error) throw this.handleError(error);
    return data as UserSettings;
  }
}
