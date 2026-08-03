import { supabase } from '@/services/supabaseClient';
import { Reminder } from '@/types/database';
import { BaseRepository } from './base';

export interface IReminderRepository {
  create(reminder: Omit<Reminder, 'id' | 'is_sent' | 'created_at' | 'updated_at'>): Promise<Reminder>;
  getById(id: string): Promise<Reminder | null>;
  getByTaskId(taskId: string): Promise<Reminder[]>;
  getPending(): Promise<Reminder[]>;
  update(id: string, updates: Partial<Omit<Reminder, 'id' | 'task_id' | 'created_at' | 'updated_at'>>): Promise<Reminder>;
  delete(id: string): Promise<void>;
}

export class ReminderRepository extends BaseRepository implements IReminderRepository {
  async create(reminder: Omit<Reminder, 'id' | 'is_sent' | 'created_at' | 'updated_at'>): Promise<Reminder> {
    const { data, error } = await supabase.from('reminders').insert([reminder]).select().single();

    if (error) throw this.handleError(error);
    return data as Reminder;
  }

  async getById(id: string): Promise<Reminder | null> {
    const { data, error } = await supabase.from('reminders').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw this.handleError(error);
    }

    return data as Reminder;
  }

  async getByTaskId(taskId: string): Promise<Reminder[]> {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('task_id', taskId)
      .order('remind_at', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Reminder[]) || [];
  }

  async getPending(): Promise<Reminder[]> {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('is_sent', false)
      .lte('remind_at', now)
      .order('remind_at', { ascending: true });

    if (error) throw this.handleError(error);
    return (data as Reminder[]) || [];
  }

  async update(
    id: string,
    updates: Partial<Omit<Reminder, 'id' | 'task_id' | 'created_at' | 'updated_at'>>,
  ): Promise<Reminder> {
    const { data, error } = await supabase.from('reminders').update(updates).eq('id', id).select().single();

    if (error) throw this.handleError(error);
    return data as Reminder;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('reminders').delete().eq('id', id);

    if (error) throw this.handleError(error);
  }
}
