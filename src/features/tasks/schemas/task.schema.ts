import { z } from 'zod';

export const prioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export const taskStatusSchema = z.enum(['NOT_STARTED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'CANCELLED']);
export const recurrenceSchema = z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM']);

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(255, 'Title too long'),
  description: z.string().optional(),
  priority: prioritySchema.default('MEDIUM'),
  categoryId: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  recurrence: recurrenceSchema.optional(),
});

export type CreateTaskForm = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  status: taskStatusSchema.optional(),
  priority: prioritySchema.optional(),
  categoryId: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
});

export type UpdateTaskForm = z.infer<typeof updateTaskSchema>;

export const taskFilterSchema = z.object({
  status: taskStatusSchema.array().optional(),
  priority: prioritySchema.array().optional(),
  categoryId: z.string().uuid().optional(),
  dueBefore: z.string().datetime().optional(),
  dueAfter: z.string().datetime().optional(),
  isOverdue: z.boolean().optional(),
  isDueToday: z.boolean().optional(),
  isDueSoon: z.boolean().optional(),
});

export type TaskFilterForm = z.infer<typeof taskFilterSchema>;
