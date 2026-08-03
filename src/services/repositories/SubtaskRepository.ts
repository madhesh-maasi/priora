import { supabase } from '@/services/supabaseClient';
import { Subtask } from '@/types/database';
import { BaseRepository } from './base';
import { ISubtaskRepository } from './ISubtaskRepository';

export class SubtaskRepository extends BaseRepository implements ISubtaskRepository {
  async create(subtask: Omit<Subtask, 'id' | 'created_at' | 'updated_at'>): Promise<Subtask> {
    const { data, error } = await supabase.from('subtasks').insert([subtask]).select().single();

    if (error) throw this.handleError(error);
    return data as Subtask;
  }

  async getById(id: string): Promise<Subtask | null> {
    const { data, error } = await supabase.from('subtasks').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw this.handleError(error);
    }

    return data as Subtask;
  }

  async getByTaskId(taskId: string): Promise<Subtask[]> {
    const { data, error } = await supabase
      .from('subtasks')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Subtask[]) || [];
  }

  async getByStatus(taskId: string, status: string): Promise<Subtask[]> {
    const { data, error } = await supabase
      .from('subtasks')
      .select('*')
      .eq('task_id', taskId)
      .eq('status', status)
      .order('created_at', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Subtask[]) || [];
  }

  async update(
    id: string,
    updates: Partial<Omit<Subtask, 'id' | 'task_id' | 'created_at' | 'updated_at'>>,
  ): Promise<Subtask> {
    const { data, error } = await supabase.from('subtasks').update(updates).eq('id', id).select().single();

    if (error) throw this.handleError(error);
    return data as Subtask;
  }

  async updateStatus(id: string, status: string): Promise<Subtask> {
    return this.update(id, { status: status as any });
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('subtasks').delete().eq('id', id);

    if (error) throw this.handleError(error);
  }

  async deleteByTaskId(taskId: string): Promise<void> {
    const { error } = await supabase.from('subtasks').delete().eq('task_id', taskId);

    if (error) throw this.handleError(error);
  }

  async bulkDelete(ids: string[]): Promise<void> {
    const { error } = await supabase.from('subtasks').delete().in('id', ids);

    if (error) throw this.handleError(error);
  }

  async bulkUpdateStatus(ids: string[], status: string): Promise<void> {
    const { error } = await supabase.from('subtasks').update({ status: status as any }).in('id', ids);

    if (error) throw this.handleError(error);
  }
}
