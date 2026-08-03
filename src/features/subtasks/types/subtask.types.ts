export interface Subtask {
  id: string;
  taskId: string;
  userId: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  completedAt?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubtaskWithTask extends Subtask {
  taskTitle?: string;
}

export interface SubtaskStats {
  total: number;
  completed: number;
  completionPercentage: number;
}

export interface SubtasksState {
  subtasks: Subtask[];
  isLoading: boolean;
  error: string | null;
  stats: SubtaskStats;
}

export interface CreateSubtaskInput {
  taskId: string;
  title: string;
  description?: string;
  order?: number;
}

export interface UpdateSubtaskInput {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  completedAt?: string;
  order?: number;
}
