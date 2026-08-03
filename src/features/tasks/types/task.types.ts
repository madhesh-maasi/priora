export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED';
export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  categoryId?: string;
  dueDate?: string;
  startDate?: string;
  completedAt?: string;
  recurrence?: RecurrenceFrequency;
  recurrenceEndDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  status?: TaskStatus[];
  priority?: Priority[];
  categoryId?: string;
  dueBefore?: string;
  dueAfter?: string;
  isOverdue?: boolean;
  isDueToday?: boolean;
  isDueSoon?: boolean; // Next 7 days
}

export interface TaskSort {
  field: 'dueDate' | 'priority' | 'createdAt' | 'updatedAt' | 'title';
  direction: 'asc' | 'desc';
}

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  categoryId?: string;
  dueDate?: string;
  startDate?: string;
  recurrence?: RecurrenceFrequency;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  categoryId?: string;
  dueDate?: string;
  startDate?: string;
  completedAt?: string;
}
