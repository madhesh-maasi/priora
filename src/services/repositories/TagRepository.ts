import { supabase } from '@/services/supabaseClient';
import { Tag } from '@/types/database';
import { BaseRepository } from './base';

export interface ITagRepository {
  create(tag: Omit<Tag, 'id' | 'created_at' | 'updated_at'>): Promise<Tag>;
  getById(id: string): Promise<Tag | null>;
  getAll(): Promise<Tag[]>;
  update(id: string, updates: Partial<Omit<Tag, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Tag>;
  delete(id: string): Promise<void>;
}

export class TagRepository extends BaseRepository implements ITagRepository {
  async create(tag: Omit<Tag, 'id' | 'created_at' | 'updated_at'>): Promise<Tag> {
    const { data, error } = await supabase.from('tags').insert([tag]).select().single();

    if (error) throw this.handleError(error);
    return data as Tag;
  }

  async getById(id: string): Promise<Tag | null> {
    const { data, error } = await supabase.from('tags').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw this.handleError(error);
    }

    return data as Tag;
  }

  async getAll(): Promise<Tag[]> {
    const { data, error } = await supabase.from('tags').select('*').order('name', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Tag[]) || [];
  }

  async update(id: string, updates: Partial<Omit<Tag, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Tag> {
    const { data, error } = await supabase.from('tags').update(updates).eq('id', id).select().single();

    if (error) throw this.handleError(error);
    return data as Tag;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('tags').delete().eq('id', id);

    if (error) throw this.handleError(error);
  }
}
