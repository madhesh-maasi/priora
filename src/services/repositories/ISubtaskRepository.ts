import { Subtask } from '@/types/database';

export interface ISubtaskRepository {
  // Create
  create(subtask: Omit<Subtask, 'id' | 'created_at' | 'updated_at'>): Promise<Subtask>;

  // Read
  getById(id: string): Promise<Subtask | null>;
  getByTaskId(taskId: string): Promise<Subtask[]>;
  getByStatus(taskId: string, status: string): Promise<Subtask[]>;

  // Update
  update(id: string, updates: Partial<Omit<Subtask, 'id' | 'task_id' | 'created_at' | 'updated_at'>>): Promise<Subtask>;
  updateStatus(id: string, status: string): Promise<Subtask>;

  // Delete
  delete(id: string): Promise<void>;
  deleteByTaskId(taskId: string): Promise<void>;

  // Bulk
  bulkDelete(ids: string[]): Promise<void>;
  bulkUpdateStatus(ids: string[], status: string): Promise<void>;
}
