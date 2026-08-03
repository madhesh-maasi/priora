-- Phase 1.7: Default Seed Data

-- Function to seed default categories for new users
create or replace function public.seed_default_categories()
returns trigger as $$
declare
  category_id uuid;
begin
  -- Insert default categories for the new user
  insert into public.categories (user_id, name, color, icon, description)
  values
    (new.id, 'Personal', '#6366f1', 'circle-user', 'Personal tasks and reminders'),
    (new.id, 'Work', '#f59e0b', 'briefcase', 'Work-related tasks'),
    (new.id, 'Shopping', '#10b981', 'shopping-cart', 'Shopping and errands'),
    (new.id, 'Health', '#ef4444', 'heart', 'Health and fitness goals'),
    (new.id, 'Finance', '#06b6d4', 'wallet', 'Financial planning and tracking'),
    (new.id, 'Learning', '#8b5cf6', 'book-open', 'Educational and learning goals'),
    (new.id, 'Projects', '#ec4899', 'layer-group', 'Project management tasks');

  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Trigger: Seed default categories when user_settings are created
create trigger seed_default_categories_on_user_settings
  after insert on public.user_settings
  for each row execute function public.seed_default_categories();

-- Note: This function will be called automatically when a new user signs up via the trigger chain:
-- 1. auth.users insert triggers handle_new_user()
-- 2. handle_new_user() inserts profile
-- 3. profile insert triggers handle_new_user_settings()
-- 4. handle_new_user_settings() inserts user_settings
-- 5. user_settings insert triggers seed_default_categories()
