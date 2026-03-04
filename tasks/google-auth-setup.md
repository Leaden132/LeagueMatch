# Google OAuth Setup

## 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URI:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
   (Find your project ref in Supabase dashboard URL)
7. Copy the **Client ID** and **Client Secret**

## 2. Configure Supabase

1. Go to your Supabase dashboard
2. Navigate to **Authentication > Providers**
3. Find **Google** and enable it
4. Paste your **Client ID** and **Client Secret**
5. Save

## 3. Uncomment Frontend Code

### `src/hooks/use-auth.tsx`

- Uncomment `signInWithGoogle` in the `AuthContextValue` interface
- Uncomment the `signInWithGoogle` callback
- Add `signInWithGoogle` back to the `value` object

### `src/components/auth/login-form.tsx`

- Destructure `signInWithGoogle` from `useAuth()`
- Uncomment the `handleGoogle` function
- Uncomment the divider and Google button JSX

### `src/components/auth/signup-form.tsx`

- Same changes as login-form above

All commented-out sections are marked with `TODO: Uncomment when Google OAuth is configured`.
