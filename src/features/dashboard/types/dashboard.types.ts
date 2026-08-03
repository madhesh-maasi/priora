export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  dueSoon: number; // Next 7 days
  completionRate: number; // 0-100
}

export interface DashboardMetrics {
  stats: TaskStats;
  streak: number; // Days of consecutive completion
  lastActivityDate?: string;
  totalTimeSpent?: number; // In minutes
  averageCompletionTime?: number; // In hours
}

export interface RecentTask {
  id: string;
  title: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  dueDate?: string;
  categoryId?: string;
  categoryName?: string;
  completedAt?: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recentTasks: RecentTask[];
  upcomingTasks: RecentTask[];
  overdueTasks: RecentTask[];
}

export interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated?: string;
}
