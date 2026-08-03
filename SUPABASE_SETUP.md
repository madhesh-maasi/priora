# Supabase Setup Guide for Priora

Complete guide for setting up Priora's Supabase database backend.

## Phase 1: Initial Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Enter project details:
   - **Name:** `priora` (or your preference)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your location
   - **Pricing Plan:** Free tier works for development
5. Wait for project to initialize (2-5 minutes)

### 1.2 Get Project Credentials

After project creation:

1. Go to **Project Settings** → **API**
2. Copy the following to `.env.local`:
   ```env
   REACT_NATIVE_SUPABASE_URL=https://your-project.supabase.co
   REACT_NATIVE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Save the JWT Secret (under **Settings** → **API**)

### 1.3 Enable PostgreSQL Extensions

1. Open the **SQL Editor** in Supabase
2. Copy and paste the following SQL:
   ```sql
   create extension if not exists "uuid-ossp";
   create extension if not exists "pg_trgm";
   ```
3. Click **Run** or press `Ctrl+Enter`

## Phase 2: Apply Database Migrations

### Option A: Manual SQL (Recommended for Getting Started)

1. Open **SQL Editor** in Supabase dashboard
2. For each migration file, copy the entire contents:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_triggers_functions.sql`
   - `supabase/migrations/004_seed_data.sql`
3. Paste into SQL Editor and run each one sequentially
4. Verify no errors appear

### Option B: Supabase CLI (For Production)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Apply migrations:
   ```bash
   supabase db push
   ```

## Phase 3: Verify Schema

After running migrations, verify everything is set up correctly:

1. **Tables:** Go to **Table Editor** and verify all tables exist:
   - `profiles`
   - `user_settings`
   - `categories`
   - `tags`
   - `tasks`
   - `subtasks`
   - `task_tags`
   - `reminders`

2. **Enums:** In **SQL Editor**, run:
   ```sql
   select * from pg_type where typtype = 'e';
   ```
   Should show: `priority_level`, `task_status_type`, `recurrence_frequency`

3. **RLS Enabled:** In **Table Editor**, select each table and verify "Row Level Security" is enabled (toggle should be ON)

4. **Triggers:** In **SQL Editor**, run:
   ```sql
   select trigger_name, table_name from information_schema.triggers 
   where table_schema = 'public';
   ```
   Should show ~10+ triggers

## Phase 4: Configure Authentication

### 4.1 Email/Password Auth

1. Go to **Authentication** → **Providers**
2. Ensure "Email" provider is enabled (default)
3. Click "Email" to configure:
   - Set "Confirm email" to "Off" for development (turn on for production)
   - Configure email templates as needed

### 4.2 OAuth Providers (Optional)

For Google Sign-In:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials (Web Application)
3. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for testing)
4. Copy Client ID and Secret
5. In Supabase: **Authentication** → **Providers** → **Google**
6. Paste credentials and enable

For Apple Sign-In:
1. Similar process via Apple Developer account
2. Configure in Supabase: **Authentication** → **Providers** → **Apple**

## Phase 5: Storage Setup

### 5.1 Create Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click **New Bucket**
3. Name: `attachments`
4. Disable "Public bucket" (use RLS)
5. Click **Create Bucket**

### 5.2 Configure Storage RLS Policies

In **SQL Editor**, add:

```sql
-- Allow users to upload files to their own folder
create policy "Users can upload files"
  on storage.objects for insert
  with check (
    (bucket_id = 'attachments') and
    (auth.uid()::text = (storage.foldername(name))[1])
  );

-- Allow users to view their own files
create policy "Users can view their files"
  on storage.objects for select
  using (
    (bucket_id = 'attachments') and
    (auth.uid()::text = (storage.foldername(name))[1])
  );

-- Allow users to delete their own files
create policy "Users can delete their files"
  on storage.objects for delete
  using (
    (bucket_id = 'attachments') and
    (auth.uid()::text = (storage.foldername(name))[1])
  );
```

## Phase 6: Environment Setup

### 6.1 Create `.env.local`

Copy from `.env.example` and fill in your Supabase credentials:

```env
# Supabase Configuration
REACT_NATIVE_SUPABASE_URL=https://your-project.supabase.co
REACT_NATIVE_SUPABASE_ANON_KEY=your-anon-key

# API Configuration (for backend, if applicable)
REACT_NATIVE_API_URL=http://localhost:3000/api
```

### 6.2 Verify Connection

In your project terminal:

```bash
npm start
```

App should load without Supabase connection errors.

## Troubleshooting

### Issue: "Invalid policy error"

**Solution:** Ensure RLS is enabled on the table before creating policies.

### Issue: "Function does not exist"

**Solution:** Run migrations in order (001 → 004). Each depends on previous setup.

### Issue: "relation does not exist"

**Solution:** Verify all tables were created in `001_initial_schema.sql`. Re-run migrations if needed.

### Issue: Triggers not firing

**Solution:** Verify triggers exist in SQL Editor. Check trigger syntax for errors.

### Issue: Categories not auto-created

**Solution:** Verify entire trigger chain is in place:
1. `on_auth_user_created` → creates profile
2. `on_profile_created` → creates user_settings
3. `seed_default_categories_on_user_settings` → creates categories

## Next Steps

After database is set up:

1. **Phase 2:** Set up Supabase client in React Native
2. **Phase 3:** Generate TypeScript types from schema
3. **Phase 4:** Create repository layer for data access
4. **Phase 5:** Implement authentication flows

## Useful Supabase References

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)

## Database Schema Overview

```
User (via auth.users)
  ↓ (triggers handle_new_user)
  ├─ profiles (1:1)
  │   └─ user_settings (1:1, triggers seed_default_categories)
  │       └─ categories (1:many)
  │           └─ tasks (1:many)
  │               ├─ subtasks (1:many)
  │               ├─ task_tags (many:many via tags)
  │               └─ reminders (1:many)
  └─ tags (1:many via task_tags)

Storage
  └─ attachments (user files)
```

All tables have automatic `updated_at` timestamps and comprehensive RLS policies.
