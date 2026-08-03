import { supabase } from '@/services/supabaseClient';
import type { Subtask, SubtaskStats, CreateSubtaskInput, UpdateSubtaskInput } from '../types/subtask.types';

class SubtaskService {
  async createSubtask(userId: string, input: CreateSubtaskInput): Promise<Subtask> {
    // Get max order for this task
    const { data: existing } = await supabase
      .from('subtasks')
      .select('order')
      .eq('task_id', input.taskId)
      .order('order', { ascending: false })
      .limit(1);

    const nextOrder = existing && existing.length > 0 ? existing[0].order + 1 : 0;

    const { data, error } = await supabase
      .from('subtasks')
      .insert({
        task_id: input.taskId,
        user_id: userId,
        title: input.title,
        description: input.description,
        order: input.order ?? nextOrder,
        is_completed: false,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapSubtask(data);
  }

  async updateSubtask(subtaskId: string, input: UpdateSubtaskInput): Promise<Subtask> {
    const { data, error } = await supabase
      .from('subtasks')
      .update({
        ...(input.title && { title: input.title }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.isCompleted !== undefined && { is_completed: input.isCompleted }),
        ...(input.completedAt !== undefined && { completed_at: input.completedAt }),
        ...(input.order !== undefined && { order: input.order }),
      })
      .eq('id', subtaskId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapSubtask(data);
  }

  async deleteSubtask(subtaskId: string): Promise<void> {
    const { error } = await supabase.from('subtasks').delete().eq('id', subtaskId);
    if (error) throw new Error(error.message);
  }

  async getSubtask(subtaskId: string): Promise<Subtask> {
    const { data, error } = await supabase
      .from('subtasks')
      .select()
      .eq('id', subtaskId)
      .single();

    if (error) throw new Error(error.message);
    return this.mapSubtask(data);
  }

  async getSubtasksByTask(taskId: string): Promise<Subtask[]> {
    const { data, error } = await supabase
      .from('subtasks')
      .select()
      .eq('task_id', taskId)
      .order('order', { ascending: true });

    if (error) throw new Error(error.message);
    return (data || []).map(s => this.mapSubtask(s));
  }

  async getSubtasksByUser(userId: string): Promise<Subtask[]> {
    const { data, error } = await supabase
      .from('subtasks')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(s => this.mapSubtask(s));
  }

  async completeSubtask(subtaskId: string): Promise<Subtask> {
    return this.updateSubtask(subtaskId, {
      isCompleted: true,
      completedAt: new Date().toISOString(),
    });
  }

  async uncompleteSubtask(subtaskId: string): Promise<Subtask> {
    return this.updateSubtask(subtaskId, {
      isCompleted: false,
      completedAt: undefined,
    });
  }

  async reorderSubtasks(taskId: string, reordering: Array<{ id: string; order: number }>): Promise<void> {
    // Update all subtasks in parallel
    const updates = reordering.map(item =>
      supabase
        .from('subtasks')
        .update({ order: item.order })
        .eq('id', item.id)
    );

    const results = await Promise.all(updates);
    const error = results.find(r => r.error);
    if (error?.error) throw new Error(error.error.message);
  }

  async getSubtaskStats(taskId: string): Promise<SubtaskStats> {
    const { data, error } = await supabase
      .from('subtasks')
      .select('id, is_completed', { count: 'exact' })
      .eq('task_id', taskId);

    if (error) throw new Error(error.message);

    const total = data?.length || 0;
    const completed = data?.filter(s => s.is_completed).length || 0;

    return {
      total,
      completed,
      completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  async bulkDeleteByTask(taskId: string): Promise<void> {
    const { error } = await supabase.from('subtasks').delete().eq('task_id', taskId);
    if (error) throw new Error(error.message);
  }

  private mapSubtask(data: any): Subtask {
    return {
      id: data.id,
      taskId: data.task_id,
      userId: data.user_id,
      title: data.title,
      description: data.description,
      isCompleted: data.is_completed,
      completedAt: data.completed_at,
      order: data.order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }
}

export const subtaskService = new SubtaskService();
