import { supabase } from '@/services/supabaseClient';
import { Category } from '@/types/database';
import { BaseRepository } from './base';

export interface ICategoryRepository {
  create(category: Omit<Category, 'id' | 'task_count' | 'created_at' | 'updated_at'>): Promise<Category>;
  getById(id: string): Promise<Category | null>;
  getAll(): Promise<Category[]>;
  update(id: string, updates: Partial<Omit<Category, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Category>;
  delete(id: string): Promise<void>;
}

export class CategoryRepository extends BaseRepository implements ICategoryRepository {
  async create(category: Omit<Category, 'id' | 'task_count' | 'created_at' | 'updated_at'>): Promise<Category> {
    const { data, error } = await supabase.from('categories').insert([category]).select().single();

    if (error) throw this.handleError(error);
    return data as Category;
  }

  async getById(id: string): Promise<Category | null> {
    const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw this.handleError(error);
    }

    return data as Category;
  }

  async getAll(): Promise<Category[]> {
    const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Category[]) || [];
  }

  async update(
    id: string,
    updates: Partial<Omit<Category, 'id' | 'user_id' | 'created_at' | 'updated_at'>>,
  ): Promise<Category> {
    const { data, error } = await supabase.from('categories').update(updates).eq('id', id).select().single();

    if (error) throw this.handleError(error);
    return data as Category;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) throw this.handleError(error);
  }
}
