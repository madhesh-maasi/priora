export { BaseRepository, type RepositoryError } from './base';
export { TaskRepository, type ITaskRepository } from './TaskRepository';
export { SubtaskRepository, type ISubtaskRepository } from './SubtaskRepository';
export { CategoryRepository, type ICategoryRepository } from './CategoryRepository';
export { TagRepository, type ITagRepository } from './TagRepository';
export { ProfileRepository, type IProfileRepository } from './ProfileRepository';
export { SettingsRepository, type ISettingsRepository } from './SettingsRepository';
export { ReminderRepository, type IReminderRepository } from './ReminderRepository';

// Singleton instances for use across the app
export const repositories = {
  task: new TaskRepository(),
  subtask: new SubtaskRepository(),
  category: new CategoryRepository(),
  tag: new TagRepository(),
  profile: new ProfileRepository(),
  settings: new SettingsRepository(),
  reminder: new ReminderRepository(),
};
