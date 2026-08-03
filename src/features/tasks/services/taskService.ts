import { supabase } from '@/services/supabaseClient';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task.types';

class TaskService {
  async createTask(userId: string, input: CreateTaskInput): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        title: input.title,
        description: input.description,
        priority: input.priority || 'MEDIUM',
        status: 'NOT_STARTED',
        category_id: input.categoryId,
        due_date: input.dueDate,
        start_date: input.startDate,
        recurrence: input.recurrence,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapTask(data);
  }

  async updateTask(taskId: string, input: UpdateTaskInput): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...(input.title && { title: input.title }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.status && { status: input.status }),
        ...(input.priority && { priority: input.priority }),
        ...(input.categoryId !== undefined && { category_id: input.categoryId }),
        ...(input.dueDate !== undefined && { due_date: input.dueDate }),
        ...(input.startDate !== undefined && { start_date: input.startDate }),
        ...(input.completedAt && { completed_at: input.completedAt }),
      })
      .eq('id', taskId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapTask(data);
  }

  async deleteTask(taskId: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) throw new Error(error.message);
  }

  async getTask(taskId: string): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('id', taskId)
      .single();

    if (error) throw new Error(error.message);
    return this.mapTask(data);
  }

  async getUserTasks(userId: string, limit: number = 50, offset: number = 0): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('user_id', userId)
      .order('due_date', { ascending: true, nullsFirst: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return (data || []).map(task => this.mapTask(task));
  }

  async getTasksByStatus(userId: string, status: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('user_id', userId)
      .eq('status', status)
      .order('due_date', { ascending: true, nullsFirst: false });

    if (error) throw new Error(error.message);
    return (data || []).map(task => this.mapTask(task));
  }

  async getTasksByCategory(userId: string, categoryId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .order('due_date', { ascending: true, nullsFirst: false });

    if (error) throw new Error(error.message);
    return (data || []).map(task => this.mapTask(task));
  }

  async getTasksDueDate(userId: string, startDate: string, endDate: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('user_id', userId)
      .gte('due_date', startDate)
      .lte('due_date', endDate)
      .order('due_date', { ascending: true });

    if (error) throw new Error(error.message);
    return (data || []).map(task => this.mapTask(task));
  }

  async completeTask(taskId: string): Promise<Task> {
    return this.updateTask(taskId, {
      status: 'COMPLETED',
      completedAt: new Date().toISOString(),
    });
  }

  async bulkUpdateStatus(taskIds: string[], status: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .in('id', taskIds);

    if (error) throw new Error(error.message);
  }

  async bulkDelete(taskIds: string[]): Promise<void> {
    const { error } = await supabase.from('tasks').delete().in('id', taskIds);
    if (error) throw new Error(error.message);
  }

  private mapTask(data: any): Task {
    return {
      id: data.id,
      userId: data.user_id,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      categoryId: data.category_id,
      dueDate: data.due_date,
      startDate: data.start_date,
      completedAt: data.completed_at,
      recurrence: data.recurrence,
      recurrenceEndDate: data.recurrence_end_date,
      estimatedHours: data.estimated_hours,
      actualHours: data.actual_hours,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }
}

export const taskService = new TaskService();
