-- Phase 1.6: Create Triggers & Functions

-- Function to handle new user signup (creates profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Trigger: Create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to handle new user settings creation
create or replace function public.handle_new_user_settings()
returns trigger as $$
begin
  insert into public.user_settings (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Trigger: Create user settings when profile is created
create trigger on_profile_created
  after insert on public.profiles
  for each row execute function public.handle_new_user_settings();

-- Function to automatically update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply update_updated_at trigger to all tables with updated_at column
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger update_user_settings_updated_at
  before update on public.user_settings
  for each row execute function public.update_updated_at();

create trigger update_categories_updated_at
  before update on public.categories
  for each row execute function public.update_updated_at();

create trigger update_tags_updated_at
  before update on public.tags
  for each row execute function public.update_updated_at();

create trigger update_tasks_updated_at
  before update on public.tasks
  for each row execute function public.update_updated_at();

create trigger update_subtasks_updated_at
  before update on public.subtasks
  for each row execute function public.update_updated_at();

create trigger update_reminders_updated_at
  before update on public.reminders
  for each row execute function public.update_updated_at();

-- Function to handle task completion (sets completed_at)
create or replace function public.handle_task_complete()
returns trigger as $$
begin
  if new.status = 'COMPLETED' and old.status != 'COMPLETED' then
    new.completed_at = now();
  elsif new.status != 'COMPLETED' and old.status = 'COMPLETED' then
    new.completed_at = null;
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger: Automatically set completed_at when task is marked complete
create trigger task_completion_trigger
  before update on public.tasks
  for each row execute function public.handle_task_complete();

-- Function to update category task count
create or replace function public.update_category_task_count()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.categories
    set task_count = task_count + 1
    where id = new.category_id and new.category_id is not null;
  elsif tg_op = 'DELETE' then
    update public.categories
    set task_count = task_count - 1
    where id = old.category_id and old.category_id is not null;
  elsif tg_op = 'UPDATE' and new.category_id != old.category_id then
    if old.category_id is not null then
      update public.categories
      set task_count = task_count - 1
      where id = old.category_id;
    end if;
    if new.category_id is not null then
      update public.categories
      set task_count = task_count + 1
      where id = new.category_id;
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger: Update category task count on task changes
create trigger update_category_task_count
  after insert or delete or update on public.tasks
  for each row execute function public.update_category_task_count();
