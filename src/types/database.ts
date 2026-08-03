export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED';
export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM';

export interface Profile {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  timezone: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  theme: 'light' | 'dark';
  notifications_enabled: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  task_reminders_enabled: boolean;
  default_reminder_time: string;
  week_starts_on: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon?: string;
  description?: string;
  task_count: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  category_id?: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  due_date?: string;
  due_time?: string;
  recurrence?: RecurrenceFrequency;
  recurrence_end_date?: string;
  estimated_duration?: number;
  actual_duration?: number;
  attachments_count: number;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Subtask {
  id: string;
  task_id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskTag {
  task_id: string;
  tag_id: string;
  created_at: string;
}

export interface Reminder {
  id: string;
  task_id: string;
  remind_at: string;
  reminder_type: string;
  is_sent: boolean;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      user_settings: {
        Row: UserSettings;
        Insert: Omit<UserSettings, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'task_count' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Tag, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'attachments_count' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      subtasks: {
        Row: Subtask;
        Insert: Omit<Subtask, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Subtask, 'id' | 'task_id' | 'created_at' | 'updated_at'>>;
      };
      task_tags: {
        Row: TaskTag;
        Insert: TaskTag;
        Update: never;
      };
      reminders: {
        Row: Reminder;
        Insert: Omit<Reminder, 'id' | 'is_sent' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Reminder, 'id' | 'task_id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
