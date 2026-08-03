import type { Task } from '../types/task.types';

export class TaskHelpers {
  static isOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === 'COMPLETED') return false;
    return new Date(task.dueDate) < new Date();
  }

  static isDueToday(task: Task): boolean {
    if (!task.dueDate || task.status === 'COMPLETED') return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate.getTime() === today.getTime();
  }

  static isDueSoon(task: Task, days: number = 7): boolean {
    if (!task.dueDate || task.status === 'COMPLETED') return false;

    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const dueDate = new Date(task.dueDate);

    return dueDate > now && dueDate <= futureDate;
  }

  static getDaysUntilDue(task: Task): number | null {
    if (!task.dueDate) return null;

    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const diff = dueDate.getTime() - now.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  static formatDueDate(task: Task): string {
    if (!task.dueDate) return 'No due date';

    const daysUntil = this.getDaysUntilDue(task);
    if (daysUntil === null) return 'No due date';

    if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`;
    if (daysUntil === 0) return 'Due today';
    if (daysUntil === 1) return 'Due tomorrow';
    if (daysUntil <= 7) return `Due in ${daysUntil} days`;

    return new Date(task.dueDate).toLocaleDateString();
  }

  static getPriorityColor(priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): string {
    const colors = {
      LOW: '#10b981',    // green
      MEDIUM: '#f59e0b', // amber
      HIGH: '#ef4444',   // red
      CRITICAL: '#7c3aed', // violet
    };
    return colors[priority];
  }

  static getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      NOT_STARTED: '○',
      IN_PROGRESS: '◐',
      BLOCKED: '⊗',
      COMPLETED: '✓',
      CANCELLED: '×',
    };
    return icons[status] || '○';
  }

  static groupByStatus(tasks: Task[]): Record<string, Task[]> {
    const grouped: Record<string, Task[]> = {
      NOT_STARTED: [],
      IN_PROGRESS: [],
      BLOCKED: [],
      COMPLETED: [],
      CANCELLED: [],
    };

    tasks.forEach(task => {
      grouped[task.status].push(task);
    });

    return grouped;
  }

  static groupByPriority(tasks: Task[]): Record<string, Task[]> {
    const grouped: Record<string, Task[]> = {
      CRITICAL: [],
      HIGH: [],
      MEDIUM: [],
      LOW: [],
    };

    tasks.forEach(task => {
      grouped[task.priority].push(task);
    });

    return grouped;
  }

  static groupByDueDate(tasks: Task[]): Record<string, Task[]> {
    const grouped: Record<string, Task[]> = {
      overdue: [],
      today: [],
      tomorrow: [],
      thisWeek: [],
      nextWeek: [],
      later: [],
      noDueDate: [],
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    tasks.forEach(task => {
      if (!task.dueDate) {
        grouped.noDueDate.push(task);
        return;
      }

      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      const today = new Date(now);
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 7);

      if (dueDate < today) {
        grouped.overdue.push(task);
      } else if (dueDate.getTime() === today.getTime()) {
        grouped.today.push(task);
      } else if (dueDate.getTime() === tomorrow.getTime()) {
        grouped.tomorrow.push(task);
      } else if (dueDate <= nextWeek) {
        grouped.thisWeek.push(task);
      } else {
        grouped.later.push(task);
      }
    });

    return grouped;
  }
}
