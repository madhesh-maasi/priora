# Priora — Intelligent Task Management System

A cross-platform task management application built with React Native CLI, supporting iOS, Android, and Web.

## Technology Stack

- **Framework:** React Native (CLI) + TypeScript
- **State Management:** Zustand (client state), TanStack Query (server state)
- **Form Management:** React Hook Form + Zod validation
- **Database:** Supabase (PostgreSQL)
- **HTTP Client:** Axios
- **Code Quality:** ESLint, Prettier, TypeScript (strict mode)
- **Platforms:** iOS, Android, Web (via React Native Web)

## Project Structure

```
src/
├── app/               # Navigation & app shell
├── screens/           # Feature screens
│   ├── auth/         # Auth screens
│   └── dashboard/    # Dashboard screens
├── components/        # Reusable components
│   ├── layout/       # Layout components
│   ├── ui/           # Primitive UI components
│   └── feedback/     # Feedback components
├── features/         # Feature modules
│   ├── auth/         # Authentication
│   ├── dashboard/    # Dashboard
│   ├── tasks/        # Task management
│   ├── calendar/     # Calendar views
│   ├── categories/   # Categories
│   ├── tags/         # Tags
│   ├── notifications/# Notifications
│   └── settings/     # Settings
├── stores/           # Zustand stores
├── services/         # API & business logic
├── theme/            # Design tokens
├── types/            # TypeScript types
├── utils/            # Utility functions
└── lib/              # Library utilities
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm or yarn
- Xcode (for iOS) or Android Studio (for Android)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with Supabase credentials:
   ```env
   REACT_NATIVE_SUPABASE_URL=https://your-project.supabase.co
   REACT_NATIVE_SUPABASE_ANON_KEY=your-anon-key
   ```

### Running the App

**Start Metro (the bundler):**
```bash
npm start
```

**In a new terminal, run on your chosen platform:**

**Android:**
```bash
npm run android
```
Requires Android Emulator running or device connected.

**iOS:**
```bash
npm run ios
```
Requires macOS and Xcode. First-time setup:
```bash
bundle install
cd ios && bundle exec pod install && cd ..
```

**Web:**
```bash
npm run web
```
(Requires React Native Web setup)

## Available Scripts

- `npm start` - Start Metro dev server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format with Prettier
- `npm run test` - Run Jest tests

## Development Workflow

1. Make changes in `src/`
2. Fast Refresh automatically updates the app
3. Force reload: Press `R` twice (Android/CLI) or in iOS simulator
4. Run `npm run lint:fix` and `npm run format` before committing

## Architecture

Priora follows **Clean Architecture** with feature-based domain structure:

- **Presentation:** React Native screens and components
- **Application:** Hooks, state management, forms
- **Domain:** Business logic, validation, services
- **Data/Infra:** Repositories, API clients, Supabase

## Platform-Specific Notes

- **iOS:** Requires CocoaPods, Xcode 15+
- **Android:** Requires Android SDK 11+, Android Studio
- **Web:** Beta support via React Native Web

## Troubleshooting

- **Metro issues:** `npm start -- --reset-cache`
- **Pod issues (iOS):** `cd ios && rm -rf Pods && bundle exec pod install && cd ..`
- **Gradle issues (Android):** `cd android && ./gradlew clean && cd ..`

## Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
