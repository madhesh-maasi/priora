-- Phase 1.1: Enable PostgreSQL Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- Phase 1.2: Create Enums
create type priority_level as enum ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
create type task_status_type as enum ('NOT_STARTED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'CANCELLED');
create type recurrence_frequency as enum ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM');

-- Phase 1.3: Create Core Tables

-- profiles table
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  display_name text,
  avatar_url text,
  bio text,
  timezone text default 'UTC',
  language text default 'en',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- user_settings table
create table public.user_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references public.profiles on delete cascade,
  theme text default 'light',
  notifications_enabled boolean default true,
  email_notifications boolean default true,
  push_notifications boolean default true,
  task_reminders_enabled boolean default true,
  default_reminder_time text default '09:00',
  week_starts_on integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- categories table
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles on delete cascade,
  name text not null,
  color text default '#6366f1',
  icon text,
  description text,
  task_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- tags table
create table public.tags (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles on delete cascade,
  name text not null,
  color text default '#06b6d4',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- tasks table
create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles on delete cascade,
  category_id uuid references public.categories on delete set null,
  title text not null,
  description text,
  priority priority_level default 'MEDIUM',
  status task_status_type default 'NOT_STARTED',
  due_date date,
  due_time text,
  recurrence recurrence_frequency,
  recurrence_end_date date,
  estimated_duration integer,
  actual_duration integer,
  attachments_count integer default 0,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- subtasks table
create table public.subtasks (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references public.tasks on delete cascade,
  title text not null,
  status task_status_type default 'NOT_STARTED',
  priority priority_level default 'MEDIUM',
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- task_tags junction table
create table public.task_tags (
  task_id uuid not null references public.tasks on delete cascade,
  tag_id uuid not null references public.tags on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (task_id, tag_id)
);

-- reminders table
create table public.reminders (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references public.tasks on delete cascade,
  remind_at timestamp with time zone not null,
  reminder_type text default 'notification',
  is_sent boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Phase 1.4: Create Indexes
create index idx_tasks_user_status on public.tasks(user_id, status);
create index idx_tasks_due_date on public.tasks(due_date);
create index idx_subtasks_task_parent on public.subtasks(task_id);
create index idx_tasks_title_trgm on public.tasks using gin(title gin_trgm_ops);
create index idx_categories_user on public.categories(user_id);
create index idx_tags_user on public.tags(user_id);
create index idx_reminders_task on public.reminders(task_id);
create index idx_task_tags_tag on public.task_tags(tag_id);

-- Add comments for documentation
comment on table public.profiles is 'User profile information';
comment on table public.user_settings is 'User preferences and settings';
comment on table public.categories is 'Task categories organized by user';
comment on table public.tags is 'Organizational tags for tasks';
comment on table public.tasks is 'Main tasks table with priority and status';
comment on table public.subtasks is 'Sub-tasks associated with parent tasks';
comment on table public.task_tags is 'Many-to-many relationship between tasks and tags';
comment on table public.reminders is 'Task reminders and notifications';
