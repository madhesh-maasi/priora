import { supabase } from '@/services/supabaseClient';
import type { TaskStats, DashboardMetrics, RecentTask, DashboardData } from '../types/dashboard.types';

class DashboardService {
  async getTaskStats(userId: string): Promise<TaskStats> {
    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('id, status, created_at, completed_at', { count: 'exact' })
      .eq('user_id', userId);

    if (error) throw new Error(error.message);

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const stats = {
      total: tasks?.length || 0,
      completed: tasks?.filter(t => t.status === 'COMPLETED').length || 0,
      inProgress: tasks?.filter(t => t.status === 'IN_PROGRESS').length || 0,
      overdue: tasks?.filter(t => {
        const dueDate = t.created_at ? new Date(t.created_at) : null;
        return dueDate && dueDate < now && t.status !== 'COMPLETED';
      }).length || 0,
      dueSoon: tasks?.filter(t => {
        const dueDate = t.created_at ? new Date(t.created_at) : null;
        return dueDate && dueDate <= sevenDaysFromNow && dueDate > now && t.status !== 'COMPLETED';
      }).length || 0,
      completionRate: tasks && tasks.length > 0
        ? Math.round((tasks.filter(t => t.status === 'COMPLETED').length / tasks.length) * 100)
        : 0,
    };

    return stats;
  }

  async getStreak(userId: string): Promise<number> {
    const { data: completedTasks, error } = await supabase
      .from('tasks')
      .select('completed_at')
      .eq('user_id', userId)
      .eq('status', 'COMPLETED')
      .order('completed_at', { ascending: false });

    if (error) throw new Error(error.message);
    if (!completedTasks || completedTasks.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const task of completedTasks) {
      const taskDate = new Date(task.completed_at);
      taskDate.setHours(0, 0, 0, 0);

      const dayDiff = Math.floor((currentDate.getTime() - taskDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dayDiff === streak) {
        streak++;
        currentDate = new Date(taskDate.getTime() - 24 * 60 * 60 * 1000);
      } else {
        break;
      }
    }

    return streak;
  }

  async getRecentTasks(userId: string, limit: number = 5): Promise<RecentTask[]> {
    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('id, title, status, priority, due_date, category_id, completed_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);

    return tasks?.map(t => ({
      id: t.id,
      title: t.title,
      status: t.status,
      priority: t.priority,
      dueDate: t.due_date,
      categoryId: t.category_id,
      completedAt: t.completed_at,
    })) || [];
  }

  async getUpcomingTasks(userId: string, days: number = 7): Promise<RecentTask[]> {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('id, title, status, priority, due_date, category_id')
      .eq('user_id', userId)
      .neq('status', 'COMPLETED')
      .gte('due_date', now.toISOString())
      .lte('due_date', futureDate.toISOString())
      .order('due_date', { ascending: true })
      .limit(10);

    if (error) throw new Error(error.message);

    return tasks?.map(t => ({
      id: t.id,
      title: t.title,
      status: t.status,
      priority: t.priority,
      dueDate: t.due_date,
      categoryId: t.category_id,
    })) || [];
  }

  async getOverdueTasks(userId: string): Promise<RecentTask[]> {
    const now = new Date();

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('id, title, status, priority, due_date, category_id')
      .eq('user_id', userId)
      .neq('status', 'COMPLETED')
      .lt('due_date', now.toISOString())
      .order('due_date', { ascending: true })
      .limit(10);

    if (error) throw new Error(error.message);

    return tasks?.map(t => ({
      id: t.id,
      title: t.title,
      status: t.status,
      priority: t.priority,
      dueDate: t.due_date,
      categoryId: t.category_id,
    })) || [];
  }

  async getDashboardMetrics(userId: string): Promise<DashboardMetrics> {
    const stats = await this.getTaskStats(userId);
    const streak = await this.getStreak(userId);

    return {
      stats,
      streak,
      lastActivityDate: new Date().toISOString(),
    };
  }

  async getDashboardData(userId: string): Promise<DashboardData> {
    const [metrics, recentTasks, upcomingTasks, overdueTasks] = await Promise.all([
      this.getDashboardMetrics(userId),
      this.getRecentTasks(userId),
      this.getUpcomingTasks(userId),
      this.getOverdueTasks(userId),
    ]);

    return {
      metrics,
      recentTasks,
      upcomingTasks,
      overdueTasks,
    };
  }
}

export const dashboardService = new DashboardService();
