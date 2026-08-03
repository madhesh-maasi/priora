import { supabase } from '@/services/supabaseClient';
import { Task } from '@/types/database';
import { BaseRepository, RepositoryError } from './base';
import { ITaskRepository } from './ITaskRepository';

export class TaskRepository extends BaseRepository implements ITaskRepository {
  async create(task: Omit<Task, 'id' | 'attachments_count' | 'created_at' | 'updated_at'>): Promise<Task> {
    const { data, error } = await supabase.from('tasks').insert([task]).select().single();

    if (error) throw this.handleError(error);
    return data as Task;
  }

  async getById(id: string): Promise<Task | null> {
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw this.handleError(error);
    }

    return data as Task;
  }

  async getAll(): Promise<Task[]> {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });

    if (error) throw this.handleError(error);
    return (data as Task[]) || [];
  }

  async getByStatus(status: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', status)
      .order('due_date', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Task[]) || [];
  }

  async getByCategory(categoryId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('category_id', categoryId)
      .order('due_date', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Task[]) || [];
  }

  async getByDueDate(date: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('due_date', date)
      .order('due_time', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Task[]) || [];
  }

  async getUpcoming(): Promise<Task[]> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .gt('due_date', today)
      .in('status', ['NOT_STARTED', 'IN_PROGRESS'])
      .order('due_date', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Task[]) || [];
  }

  async getOverdue(): Promise<Task[]> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .lt('due_date', today)
      .in('status', ['NOT_STARTED', 'IN_PROGRESS'])
      .order('due_date', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Task[]) || [];
  }

  async getCompleted(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', 'COMPLETED')
      .order('completed_at', { ascending: false });

    if (error) throw this.handleError(error);
    return (data as Task[]) || [];
  }

  async getToday(): Promise<Task[]> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('due_date', today)
      .in('status', ['NOT_STARTED', 'IN_PROGRESS', 'BLOCKED'])
      .order('due_time', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Task[]) || [];
  }

  async update(
    id: string,
    updates: Partial<Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>>,
  ): Promise<Task> {
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select().single();

    if (error) throw this.handleError(error);
    return data as Task;
  }

  async updateStatus(id: string, status: string): Promise<Task> {
    return this.update(id, { status: status as any });
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) throw this.handleError(error);
  }

  async bulkDelete(ids: string[]): Promise<void> {
    const { error } = await supabase.from('tasks').delete().in('id', ids);

    if (error) throw this.handleError(error);
  }

  async bulkUpdateStatus(ids: string[], status: string): Promise<void> {
    const { error } = await supabase.from('tasks').update({ status: status as any }).in('id', ids);

    if (error) throw this.handleError(error);
  }
}
