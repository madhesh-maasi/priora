import { z } from 'zod';

export const createSubtaskSchema = z.object({
  taskId: z.string().uuid('Invalid task ID'),
  title: z.string().min(1, 'Subtask title is required').max(255, 'Title too long'),
  description: z.string().optional(),
  order: z.number().min(0).optional(),
});

export type CreateSubtaskForm = z.infer<typeof createSubtaskSchema>;

export const updateSubtaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
  completedAt: z.string().datetime().optional(),
  order: z.number().min(0).optional(),
});

export type UpdateSubtaskForm = z.infer<typeof updateSubtaskSchema>;

export const reorderSubtasksSchema = z.array(
  z.object({
    id: z.string().uuid(),
    order: z.number().min(0),
  })
);

export type ReorderSubtasksForm = z.infer<typeof reorderSubtasksSchema>;
