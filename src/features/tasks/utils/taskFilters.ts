import type { Task, TaskFilter } from '../types/task.types';

export class TaskFilterService {
  static applyFilters(tasks: Task[], filter: TaskFilter): Task[] {
    return tasks.filter(task => {
      // Status filter
      if (filter.status && filter.status.length > 0 && !filter.status.includes(task.status)) {
        return false;
      }

      // Priority filter
      if (filter.priority && filter.priority.length > 0 && !filter.priority.includes(task.priority)) {
        return false;
      }

      // Category filter
      if (filter.categoryId && task.categoryId !== filter.categoryId) {
        return false;
      }

      // Date filters
      if (filter.dueBefore && task.dueDate && task.dueDate > filter.dueBefore) {
        return false;
      }

      if (filter.dueAfter && task.dueDate && task.dueDate < filter.dueAfter) {
        return false;
      }

      // Overdue filter
      if (filter.isOverdue) {
        const now = new Date().toISOString();
        if (!task.dueDate || task.dueDate >= now || task.status === 'COMPLETED') {
          return false;
        }
      }

      // Due today filter
      if (filter.isDueToday) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        if (!dueDate || dueDate < today || dueDate >= tomorrow) {
          return false;
        }
      }

      // Due soon filter (next 7 days)
      if (filter.isDueSoon) {
        const now = new Date();
        const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        if (!task.dueDate) {
          return false;
        }

        const dueDate = new Date(task.dueDate);
        if (dueDate <= now || dueDate > sevenDaysFromNow || task.status === 'COMPLETED') {
          return false;
        }
      }

      return true;
    });
  }

  static sortTasks(
    tasks: Task[],
    field: 'dueDate' | 'priority' | 'createdAt' | 'updatedAt' | 'title',
    direction: 'asc' | 'desc' = 'asc'
  ): Task[] {
    const sorted = [...tasks].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (field) {
        case 'dueDate':
          aVal = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          bVal = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          break;
        case 'priority':
          const priorityMap = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
          aVal = priorityMap[a.priority];
          bVal = priorityMap[b.priority];
          break;
        case 'createdAt':
        case 'updatedAt':
          aVal = new Date(a[field]).getTime();
          bVal = new Date(b[field]).getTime();
          break;
        case 'title':
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }
}
