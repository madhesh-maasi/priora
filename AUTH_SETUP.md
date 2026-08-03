# Supabase Authentication Setup Guide

Complete guide for configuring Supabase Auth providers for Priora.

## Overview

Priora supports three authentication methods:
1. **Email/Password** — Built-in, zero setup required
2. **Google Sign-In** — OAuth 2.0
3. **Apple Sign-In** — OAuth 2.0

## Part 1: Email/Password Authentication

### Status: ✅ Ready to Use (No Setup Required)

Email/Password auth is enabled by default in Supabase. Users can:
- Sign up with email and password
- Sign in with credentials
- Reset password via email link

### Customization (Optional)

To customize email templates:

1. Go to Supabase Dashboard → **Authentication** → **Email Templates**
2. Customize:
   - Confirmation email
   - Password reset email
   - Magic link email (if using)

---

## Part 2: Google OAuth Setup

### Step 1: Create Google OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google+ API**:
   - Search "Google+ API" in the search bar
   - Click **Enable**
4. Create OAuth 2.0 credentials:
   - Go to **Credentials** in left sidebar
   - Click **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Add authorized redirect URIs (see Step 2)

### Step 2: Configure Redirect URIs

Add these URIs to your Google OAuth app:

```
https://xmtexswmiqdueqanndad.supabase.co/auth/v1/callback
https://xmtexswmiqdueqanndad.supabase.co/auth/v1/authorize
```

(Replace `xmtexswmiqdueqanndad` with your actual Supabase project ref)

**For Local Development:**
```
http://localhost:3000/auth/callback
http://localhost:8081/auth/callback
```

### Step 3: Add to Supabase

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Click **Google**
3. Toggle **Enabled**
4. Paste your Google OAuth credentials:
   - **Client ID:** From Google Cloud Console
   - **Client Secret:** From Google Cloud Console
5. Click **Save**

### Test Google Sign-In

```typescript
import { useAuth } from '@/features/auth';

function GoogleSignIn() {
  const { signInWithGoogle } = useAuth();
  
  return (
    <button onClick={() => signInWithGoogle()}>
      Sign in with Google
    </button>
  );
}
```

---

## Part 3: Apple Sign-In Setup

### Step 1: Apple Developer Account

You need an [Apple Developer](https://developer.apple.com/) account ($99/year).

### Step 2: Create App ID

1. Log in to [Apple Developer Portal](https://developer.apple.com/account)
2. Go to **Certificates, Identifiers & Profiles**
3. Select **Identifiers** → **App IDs**
4. Click **+** to create new App ID
5. Choose **App IDs**
6. Fill in:
   - **Description:** Priora
   - **Bundle ID:** `com.priora.app` (or your domain)
7. Check **Sign in with Apple** capability
8. Click **Continue** and **Register**

### Step 3: Create Service ID

1. Go to **Identifiers** → Select **Services IDs** from dropdown
2. Click **+** to create new Service ID
3. Fill in:
   - **Description:** Priora Apple Auth
   - **Identifier:** `com.priora.app.signin` (unique)
4. Check **Sign in with Apple**
5. Click **Configure**
6. Add your domain and Supabase callback URL:
   - **Primary Domain:** `priora.app` (your domain)
   - **Return URLs:**
     ```
     https://xmtexswmiqdueqanndad.supabase.co/auth/v1/callback
     ```
7. Click **Save**, then **Continue** and **Register**

### Step 4: Create Private Key

1. Go to **Keys** section
2. Click **+** to create new key
3. Name: "Priora"
4. Check **Sign in with Apple**
5. Click **Configure**
6. Select your Service ID from Step 3
7. Click **Save**, then **Create**
8. Download the `.p8` file (private key)
   - Keep this **secret** — don't commit to git

### Step 5: Add to Supabase

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Click **Apple**
3. Toggle **Enabled**
4. Fill in:
   - **Client ID (Services ID):** `com.priora.app.signin`
   - **Team ID:** From Apple Developer account (top right)
   - **Key ID:** From the private key file name
   - **Private Key:** Contents of the `.p8` file
5. Click **Save**

### Test Apple Sign-In (macOS/iOS Only)

```typescript
import { useAuth } from '@/features/auth';

function AppleSignIn() {
  const { signInWithApple } = useAuth();
  
  return (
    <button onClick={() => signInWithApple()}>
      Sign in with Apple
    </button>
  );
}
```

---

## Part 4: Configure Auth in Priora

### Environment Variables

Your `.env.local` already has Supabase credentials:

```env
REACT_NATIVE_SUPABASE_URL=https://xmtexswmiqdueqanndad.supabase.co
REACT_NATIVE_SUPABASE_ANON_KEY=sb_publishable_...
```

No additional auth env vars needed! ✅

### Using Auth in Components

#### Sign Up

```typescript
import { useAuth } from '@/features/auth';
import { signUpSchema } from '@/features/auth';

function SignUpForm() {
  const { signUp, isLoading, error } = useAuth();

  async function handleSubmit(data) {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        displayName: data.name,
      });
    } catch (err) {
      console.error('Sign up failed:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="text" placeholder="Full Name" />
      <button disabled={isLoading}>{isLoading ? 'Signing up...' : 'Sign Up'}</button>
    </form>
  );
}
```

#### Sign In

```typescript
function SignInForm() {
  const { signIn, isLoading, error } = useAuth();

  async function handleSubmit(data) {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error('Sign in failed:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</button>
    </form>
  );
}
```

#### OAuth Sign-In

```typescript
function OAuthSignIn() {
  const { signInWithGoogle, signInWithApple, isLoading } = useAuth();

  return (
    <div>
      <button onClick={signInWithGoogle} disabled={isLoading}>
        Sign in with Google
      </button>
      <button onClick={signInWithApple} disabled={isLoading}>
        Sign in with Apple
      </button>
    </div>
  );
}
```

#### Protected Routes

```typescript
import { useAuth } from '@/features/auth';

function ProtectedComponent() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  
  if (!user) return <Redirect to="/auth/login" />;

  return <div>Welcome, {user.email}!</div>;
}
```

---

## Part 5: Verification Checklist

### Email/Password ✅
- [x] Built-in, ready to use
- [x] No setup required
- [x] Customizable email templates

### Google OAuth
- [ ] Google Cloud project created
- [ ] OAuth credentials generated
- [ ] Redirect URIs added to Google
- [ ] Credentials added to Supabase
- [ ] Tested sign-in flow

### Apple Sign-In
- [ ] Apple Developer account active
- [ ] App ID created
- [ ] Service ID created
- [ ] Private key generated and stored securely
- [ ] Key ID and Team ID noted
- [ ] Credentials added to Supabase
- [ ] Tested sign-in flow

---

## Troubleshooting

### Issue: "Invalid redirect URI"

**Solution:** Ensure your redirect URIs in OAuth provider match exactly:
```
https://xmtexswmiqdueqanndad.supabase.co/auth/v1/callback
```

### Issue: Google sign-in not working

**Solution:** 
1. Verify Client ID and Client Secret are correct in Supabase
2. Check Google Cloud Console for OAuth 2.0 credentials
3. Ensure Google+ API is enabled

### Issue: Apple sign-in fails on Android

**Solution:** Apple Sign-In is only available on Apple platforms (iOS, macOS). Android users can use Email or Google.

### Issue: "User already exists"

**Solution:** User tried to sign up with an email already registered. Use sign in instead.

---

## Next Steps

1. Configure Email/Password (already enabled ✅)
2. Set up Google OAuth (follow Part 2)
3. Set up Apple Sign-In (follow Part 3)
4. Build auth UI components (Phase 5)

All auth logic is ready in `src/features/auth/` with:
- ✅ useAuth hook for easy integration
- ✅ useSession hook for session management
- ✅ Zod schemas for form validation
- ✅ Type-safe auth service
