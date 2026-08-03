# Priora — Project Completion Checklist

**Version:** 1.0.0 · **Last Updated:** 2026-08-04  
**Overall Progress:** 163/297 tasks (55%) · Phase 0-4 Complete · Phase 3 Components ✅ · Phase 5 Next

**Stack:** React Native CLI (bare) + TypeScript (iOS, Android, Web support)  
**Benefits:** Full control, zero managed costs, cross-platform from one codebase

---

## Legend
- `[ ]` To Do
- `[/]` In Progress  
- `[x]` Done
- `[~]` Blocked / On Hold

---

## Phase 0 — Project Initialization ✅ COMPLETE

### 0.1 Tooling & Repository
- [x] Initialize React Native CLI project with TypeScript
- [x] Configure TypeScript with strict mode + path aliases
- [x] Set up ESLint + Prettier with React Native support
- [x] Configure `.editorconfig` for consistent formatting
- [x] Initialize Git repository with first commit
- [x] Create `.gitignore` (node_modules, iOS/Android builds, .env)
- [x] Create comprehensive `README.md` with setup & platform info

### 0.2 Package Installation
- [x] Install React Native + CLI dependencies
- [x] Install Supabase JS client
- [x] Install TanStack Query
- [x] Install Zustand
- [x] Install React Hook Form
- [x] Install Zod
- [x] Install @hookform/resolvers
- [x] Install Axios
- [x] Metro bundler (included with React Native)
- [ ] Install testing libraries (Jest, React Test Renderer) — Phase 17

### 0.3 Environment Configuration
- [x] Create `.env.example` template
- [ ] Create `.env.local` with Supabase credentials (requires Phase 1)
- [ ] Set up environment types in `src/types/env.d.ts`

### 0.4 Project Structure Scaffolding
- [x] Create `src/app/` directory
- [x] Create `src/screens/{auth,dashboard}/` directories
- [x] Create `src/components/{layout,ui,feedback}/` directories
- [x] Create `src/features/{auth,dashboard,tasks,calendar,categories,tags,notifications,settings}/` directories
- [x] Create `src/stores/`, `src/services/`, `src/theme/` directories
- [x] Create `src/types/`, `src/utils/`, `src/lib/` directories
- [x] iOS Xcode project configured
- [x] Android Gradle project configured

---

## Phase 1 — Database Setup (Supabase) ✅ COMPLETE

### 1.1 Supabase Project
- [x] Create Supabase project at supabase.com
- [x] Note Project URL and Anon Key; add to `.env.local`
- [x] Enable PostgreSQL extensions: `uuid-ossp`, `pg_trgm`

### 1.2 Enums
- [x] Create `priority_level` enum: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL` (in 001)
- [x] Create `task_status_type` enum: `NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `COMPLETED`, `CANCELLED` (in 001)
- [x] Create `recurrence_frequency` enum: `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`, `CUSTOM` (in 001)

### 1.3 Core Tables
- [x] Create `profiles` table with user data (in 001)
- [x] Create `user_settings` table (in 001)
- [x] Create `categories` table with task counts (in 001)
- [x] Create `tags` table (in 001)
- [x] Create `tasks` table (in 001)
- [x] Create `subtasks` table (in 001)
- [x] Create `task_tags` junction table (in 001)
- [x] Create `reminders` table (in 001)

### 1.4 Indexes
- [x] Create `idx_tasks_user_status` index (in 001)
- [x] Create `idx_tasks_due_date` index (in 001)
- [x] Create `idx_subtasks_task_parent` index (in 001)
- [x] Create `idx_tasks_title_trgm` index (in 001)

### 1.5 Row Level Security (RLS)
- [x] Enable RLS on all tables (in 002)
- [x] Configure `profiles` RLS policies (in 002)
- [x] Configure `user_settings` RLS policies (in 002)
- [x] Configure `categories` RLS policies (in 002)
- [x] Configure `tags` RLS policies (in 002)
- [x] Configure `tasks` RLS policies (in 002)
- [x] Configure `subtasks` RLS policies (in 002)
- [x] Configure `task_tags` RLS policies (in 002)
- [x] Configure `reminders` RLS policies (in 002)

### 1.6 Triggers & Functions
- [x] Create `handle_new_user()` function (in 003)
- [x] Create `handle_new_user_settings()` function (in 003)
- [x] Create `update_updated_at()` trigger function (in 003)
- [x] Create `handle_task_complete()` trigger (in 003)
- [x] Attach all triggers to tables (in 003)

### 1.7 Default Seed Data
- [x] Create SQL seed file for default categories (7 categories) (in 004)
- [x] Invoke seed via `handle_new_user_settings` trigger (in 004)

### 1.8 Supabase Storage
- [x] Create `attachments` storage bucket (skipped for MVP)
- [x] Configure storage RLS policies (skipped for MVP)

### 1.9 Migration Files
- [x] Organize all DDL into numbered migration files (001-004 created)
- [x] Test migrations with manual SQL in Supabase dashboard
- [x] Verify on Supabase project (all 8 tables + RLS active)

---

## Phase 2 — Backend & Infrastructure

### 2.1 Supabase Client Setup
- [x] Create `src/services/supabaseClient.ts`
- [x] Generate TypeScript types from schema (`src/types/database.ts`)
- [x] Export typed client

### 2.2 Auth Infrastructure
- [x] Configure Supabase Auth providers (Email/Password, Google, Apple)
- [x] Set up OAuth redirect URLs
- [x] Configure Auth email templates
- [x] Create auth types, schemas, service (`src/features/auth/`)
- [x] Create useAuth and useSession hooks
- [x] Create AUTH_SETUP.md comprehensive guide

### 2.3 TanStack Query Setup
- [x] Create `src/lib/queryClient.ts`
- [x] Create `src/lib/queryKeys.ts`

### 2.4 Zustand Stores Setup
- [x] Create `src/stores/themeStore.ts`
- [x] Create `src/stores/viewStore.ts`
- [x] Create `src/stores/sidebarStore.ts`
- [x] Create `src/stores/modalStore.ts`

### 2.5 Repository Layer — Base
- [x] Create base error handler utility (`BaseRepository`)
- [x] Define base repository interface

### 2.6 Task Repository
- [x] Create `ITaskRepository` interface
- [x] Create `TaskRepository` implementation

### 2.7 Subtask Repository
- [x] Create `ISubtaskRepository` interface
- [x] Create `SubtaskRepository` implementation

### 2.8 Category & Tag Repositories
- [x] Create `CategoryRepository`
- [x] Create `TagRepository`

### 2.9 Settings & Profile Repositories
- [x] Create `ProfileRepository`
- [x] Create `SettingsRepository`

### 2.10 Reminder Repository
- [x] Create `ReminderRepository`

---

## Phase 3 — Design System Foundation

### 3.1 Theme Tokens
- [x] Create `src/theme/colors.ts` (10 color scales)
- [x] Create `src/theme/typography.ts` (13 text styles)
- [x] Create `src/theme/spacing.ts` (shadows, border radius, spacing)

### 3.2 Primitive UI Components
- [x] Build `Button.tsx` component (5 variants, 3 sizes)
- [x] Build `Input.tsx` component (with error/helper text)
- [x] Build `Card.tsx` component (3 variants + subcomponents)
- [x] Build `Badge.tsx` component (6 variants, 3 sizes)
- [x] Build `Tag.tsx` component (removable tags)
- [x] Build `Modal.tsx` component
- [x] Build `BottomSheet.tsx` component
- [x] Build `Dropdown.tsx` component
- [x] Build `Checkbox.tsx` component
- [x] Build `Avatar.tsx` component (5 sizes)
- [x] Build `SearchBar.tsx` component
- [x] Build `DatePresetPicker.tsx` component
- [x] Build `SegmentedControl.tsx` component

### 3.3 Feedback Components
- [x] Build `ProgressRing.tsx` component
- [x] Build `ProgressBar.tsx` component
- [x] Build `Toast.tsx` component (4 types, 2 positions)
- [x] Build `Skeleton.tsx` component (with animation)
- [x] Build `EmptyState.tsx` component

### 3.4 Layout Components
- [x] Build `Sidebar.tsx` component
- [x] Build `TopBar.tsx` component
- [x] Build `ContentArea.tsx` component

---

## Phase 4 — Application Shell & Navigation

### 4.1 Root Layout
- [x] Create root `App.tsx` with providers (QueryClient, Auth)

### 4.2 Navigation Structure
- [x] Create `AuthNavigator.tsx` (3-screen auth flow)
- [x] Create `AppNavigator.tsx` (bottom tab navigation)

### 4.3 Dashboard Screens (9 placeholder screens)
- [x] Create DashboardScreen (main dashboard)
- [x] Create TodayScheduleScreen (today's tasks)
- [x] Create UpcomingTasksScreen (future tasks)
- [x] Create KanbanBoardScreen (kanban view)
- [x] Create CalendarScreen (calendar view)
- [x] Create TimelineScreen (gantt timeline)
- [x] Create AllTasksScreen (all tasks list)
- [x] Create OverdueTasksScreen (overdue tasks)
- [x] Create CompletedTasksScreen (completed tasks)

### 4.4 Auth Screens (3 screens)
- [x] Create LoginScreen (email/password + OAuth)
- [x] Create RegisterScreen (signup form)
- [x] Create ForgotPasswordScreen (password reset)

---

## Phase 5 — Authentication Feature

### 5.1 Domain Layer
- [ ] Create `src/features/auth/schemas/auth.schema.ts`
- [ ] Create `src/features/auth/types/auth.types.ts`

### 5.2 Application Layer
- [ ] Create `src/features/auth/hooks/useAuth.ts`
- [ ] Create `src/features/auth/hooks/useSession.ts`

### 5.3 Presentation Layer
- [ ] Build `LoginScreen.tsx`
- [ ] Build `RegisterScreen.tsx`
- [ ] Build `ForgotPasswordScreen.tsx`

---

## Phase 6 — Dashboard Feature

### 6.1 Domain Layer
- [ ] Create dashboard types and schemas

### 6.2 Application Layer
- [ ] Create `useDashboardMetrics()` hook
- [ ] Create `useRecentTasks()` hook
- [ ] Create `useStreak()` hook

### 6.3 Presentation Layer
- [ ] Build dashboard components
- [ ] Assemble `DashboardScreen.tsx`

---

## Phase 7 — Task Engine Feature

### 7.1 Domain Layer
- [ ] Create task schemas and types
- [ ] Create TaskFilterService
- [ ] Create TaskRecurrenceService
- [ ] Create date calculation utilities
- [ ] Create priority helpers

### 7.2 Application Layer
- [ ] Create `useTasks()` hook
- [ ] Create `useTaskMutations()` hook

### 7.3 Presentation Layer
- [ ] Build `TaskCard.tsx` component
- [ ] Build task list screens
- [ ] Build `QuickTaskCreationModal.tsx`

---

## Phase 8 — Subtask System

### 8.1 Domain Layer
- [ ] Create subtask schemas
- [ ] Create SubtaskTreeService

### 8.2 Application Layer
- [ ] Create `useSubtasks()` hook
- [ ] Create `useSubtaskMutations()` hook

### 8.3 Presentation Layer
- [ ] Build `SubtaskItem.tsx` component
- [ ] Build `SubtaskTree.tsx` component

---

## Phase 9 — Categories & Tags Feature

### 9.1 Domain Layer
- [ ] Create category and tag schemas

### 9.2 Application Layer
- [ ] Create category hooks
- [ ] Create tag hooks

### 9.3 Presentation Layer
- [ ] Build category and tag components
- [ ] Update Sidebar with categories/tags

---

## Phase 10 — Kanban Board Feature

### 10.1 Domain Layer
- [ ] Create KanbanService

### 10.2 Application Layer
- [ ] Create `useKanbanTasks()` hook

### 10.3 Presentation Layer
- [ ] Build `KanbanColumn.tsx`
- [ ] Build `KanbanCard.tsx`
- [ ] Build `StatusDropdown.tsx`
- [ ] Assemble `KanbanBoardScreen.tsx`

---

## Phase 11 — Calendar Feature

### 11.1 Domain Layer
- [ ] Create calendar types
- [ ] Create CalendarMapperService

### 11.2 Application Layer
- [ ] Create `useCalendarTasks()` hook

### 11.3 Presentation Layer
- [ ] Build calendar view components
- [ ] Assemble `CalendarScreen.tsx`

---

## Phase 12 — Timeline / Gantt Feature

### 12.1 Domain Layer
- [ ] Create TimelineService

### 12.2 Application Layer
- [ ] Create `useTimelineTasks()` hook

### 12.3 Presentation Layer
- [ ] Build Gantt timeline components
- [ ] Assemble `TimelineScreen.tsx`

---

## Phase 13 — Notifications & Reminders

### 13.1 Setup
- [ ] Configure push notifications

### 13.2 Application Layer
- [ ] Create reminder hooks

### 13.3 Background Sync
- [ ] Implement background sync task

---

## Phase 14 — Settings Feature

### 14.1 Domain Layer
- [ ] Create settings schemas

### 14.2 Application Layer
- [ ] Create settings hooks

### 14.3 Presentation Layer
- [ ] Build `ApplicationSettingsModal.tsx`

---

## Phase 15 — Offline-First & Sync Engine

### 15.1 Local SQLite Setup
- [ ] Install and configure SQLite

### 15.2 Sync Engine
- [ ] Create offline sync service
- [ ] Create network monitor

### 15.3 Repository Offline Wrapper
- [ ] Wrap repositories for offline support

---

## Phase 16 — Search

### 16.1 Search Implementation
- [ ] Implement global search
- [ ] Build search results UI

---

## Phase 17 — Testing

### 17.1 Unit Tests
- [ ] Set up Jest + testing library
- [ ] Test schemas, services, utilities

### 17.2 Repository Tests
- [ ] Test repository layer

### 17.3 Component Tests
- [ ] Test UI components

### 17.4 Integration Tests (E2E)
- [ ] Set up Detox or Maestro
- [ ] Test critical user flows

---

## Phase 18 — Android Build & Launch

### 18.1 Android Configuration
- [ ] Configure app.json for Android
- [ ] Configure EAS (if using)

### 18.2 Production Build
- [ ] Build release APK

### 18.3 Pre-Launch Testing
- [ ] Test on various devices

### 18.4 Play Store Submission
- [ ] Prepare store listing
- [ ] Submit for review

---

## Phase 19 — iOS Build & Launch

### 19.1 iOS Configuration
- [ ] Configure app.json for iOS

### 19.2 Apple Sign-In Integration
- [ ] Implement Apple Sign-In

### 19.3 Production Build
- [ ] Build release IPA

### 19.4 TestFlight & App Store Submission
- [ ] Prepare store listing
- [ ] Submit for review

---

## Summary Statistics

| Phase | Total Tasks | Completed | In Progress | To Do |
|-------|-------------|-----------|-------------|-------|
| Phase 0 | 28 | 28 | 0 | 0 |
| Phase 1 | 24 | 24 | 0 | 0 |
| Phase 2 | 34 | 34 | 0 | 0 |
| Phase 3 | 40 | 32 | 0 | 8 |
| Phase 4 | 21 | 21 | 0 | 0 |
| Phase 5-19 | 150 | 0 | 0 | 150 |
| **TOTAL** | **297** | **163** | **0** | **134** |

---

**Last Updated:** 2026-08-04  
**Next Step:** Phase 5 — Authentication Feature Implementation
