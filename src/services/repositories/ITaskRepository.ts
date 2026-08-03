import { Task } from '@/types/database';
import { RepositoryError } from './base';

export interface ITaskRepository {
  // Create
  create(task: Omit<Task, 'id' | 'attachments_count' | 'created_at' | 'updated_at'>): Promise<Task>;

  // Read
  getById(id: string): Promise<Task | null>;
  getAll(): Promise<Task[]>;
  getByStatus(status: string): Promise<Task[]>;
  getByCategory(categoryId: string): Promise<Task[]>;
  getByDueDate(date: string): Promise<Task[]>;
  getUpcoming(): Promise<Task[]>;
  getOverdue(): Promise<Task[]>;
  getCompleted(): Promise<Task[]>;
  getToday(): Promise<Task[]>;

  // Update
  update(id: string, updates: Partial<Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Task>;
  updateStatus(id: string, status: string): Promise<Task>;

  // Delete
  delete(id: string): Promise<void>;

  // Bulk operations
  bulkDelete(ids: string[]): Promise<void>;
  bulkUpdateStatus(ids: string[], status: string): Promise<void>;
}
