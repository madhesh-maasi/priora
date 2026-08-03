-- Phase 1.5: Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.tasks enable row level security;
alter table public.subtasks enable row level security;
alter table public.task_tags enable row level security;
alter table public.reminders enable row level security;

-- profiles RLS policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- user_settings RLS policies
create policy "Users can view their own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can update their own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

-- categories RLS policies
create policy "Users can view their own categories"
  on public.categories for select
  using (auth.uid() = user_id);

create policy "Users can insert their own categories"
  on public.categories for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own categories"
  on public.categories for update
  using (auth.uid() = user_id);

create policy "Users can delete their own categories"
  on public.categories for delete
  using (auth.uid() = user_id);

-- tags RLS policies
create policy "Users can view their own tags"
  on public.tags for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tags"
  on public.tags for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tags"
  on public.tags for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tags"
  on public.tags for delete
  using (auth.uid() = user_id);

-- tasks RLS policies
create policy "Users can view their own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- subtasks RLS policies (inherited from tasks)
create policy "Users can view subtasks of their tasks"
  on public.subtasks for select
  using (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.subtasks.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

create policy "Users can insert subtasks on their tasks"
  on public.subtasks for insert
  with check (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.subtasks.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

create policy "Users can update subtasks of their tasks"
  on public.subtasks for update
  using (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.subtasks.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

create policy "Users can delete subtasks of their tasks"
  on public.subtasks for delete
  using (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.subtasks.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

-- task_tags RLS policies
create policy "Users can view task_tags for their tasks"
  on public.task_tags for select
  using (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.task_tags.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

create policy "Users can insert task_tags for their tasks"
  on public.task_tags for insert
  with check (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.task_tags.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

create policy "Users can delete task_tags from their tasks"
  on public.task_tags for delete
  using (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.task_tags.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

-- reminders RLS policies
create policy "Users can view reminders for their tasks"
  on public.reminders for select
  using (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.reminders.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

create policy "Users can insert reminders for their tasks"
  on public.reminders for insert
  with check (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.reminders.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

create policy "Users can update reminders for their tasks"
  on public.reminders for update
  using (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.reminders.task_id
      and public.tasks.user_id = auth.uid()
    )
  );

create policy "Users can delete reminders for their tasks"
  on public.reminders for delete
  using (
    exists (
      select 1 from public.tasks
      where public.tasks.id = public.reminders.task_id
      and public.tasks.user_id = auth.uid()
    )
  );
