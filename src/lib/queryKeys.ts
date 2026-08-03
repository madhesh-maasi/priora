export const queryKeys = {
  all: ['priora'] as const,

  // Auth
  auth: {
    all: [...queryKeys.all, 'auth'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },

  // Profiles
  profiles: {
    all: [...queryKeys.all, 'profiles'] as const,
    detail: () => [...queryKeys.profiles.all, 'detail'] as const,
    current: () => [...queryKeys.profiles.all, 'current'] as const,
  },

  // User Settings
  settings: {
    all: [...queryKeys.all, 'settings'] as const,
    current: () => [...queryKeys.settings.all, 'current'] as const,
  },

  // Categories
  categories: {
    all: [...queryKeys.all, 'categories'] as const,
    list: () => [...queryKeys.categories.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.categories.all, 'detail', id] as const,
  },

  // Tags
  tags: {
    all: [...queryKeys.all, 'tags'] as const,
    list: () => [...queryKeys.tags.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.tags.all, 'detail', id] as const,
  },

  // Tasks
  tasks: {
    all: [...queryKeys.all, 'tasks'] as const,
    list: () => [...queryKeys.tasks.all, 'list'] as const,
    byStatus: (status: string) => [...queryKeys.tasks.all, 'status', status] as const,
    byCategory: (categoryId: string) => [...queryKeys.tasks.all, 'category', categoryId] as const,
    byDueDate: (date: string) => [...queryKeys.tasks.all, 'dueDate', date] as const,
    detail: (id: string) => [...queryKeys.tasks.all, 'detail', id] as const,
    upcoming: () => [...queryKeys.tasks.all, 'upcoming'] as const,
    overdue: () => [...queryKeys.tasks.all, 'overdue'] as const,
    completed: () => [...queryKeys.tasks.all, 'completed'] as const,
    today: () => [...queryKeys.tasks.all, 'today'] as const,
  },

  // Subtasks
  subtasks: {
    all: [...queryKeys.all, 'subtasks'] as const,
    byTask: (taskId: string) => [...queryKeys.subtasks.all, 'task', taskId] as const,
    detail: (id: string) => [...queryKeys.subtasks.all, 'detail', id] as const,
  },

  // Task Tags
  taskTags: {
    all: [...queryKeys.all, 'taskTags'] as const,
    byTask: (taskId: string) => [...queryKeys.taskTags.all, 'task', taskId] as const,
    byTag: (tagId: string) => [...queryKeys.taskTags.all, 'tag', tagId] as const,
  },

  // Reminders
  reminders: {
    all: [...queryKeys.all, 'reminders'] as const,
    list: () => [...queryKeys.reminders.all, 'list'] as const,
    byTask: (taskId: string) => [...queryKeys.reminders.all, 'task', taskId] as const,
    pending: () => [...queryKeys.reminders.all, 'pending'] as const,
  },

  // Dashboard
  dashboard: {
    all: [...queryKeys.all, 'dashboard'] as const,
    metrics: () => [...queryKeys.dashboard.all, 'metrics'] as const,
    recentTasks: (limit?: number) => [...queryKeys.dashboard.all, 'recentTasks', limit || 5] as const,
    upcomingTasks: (days?: number) => [...queryKeys.dashboard.all, 'upcomingTasks', days || 7] as const,
    overdueTasks: () => [...queryKeys.dashboard.all, 'overdueTasks'] as const,
    streak: () => [...queryKeys.dashboard.all, 'streak'] as const,
  },
};
