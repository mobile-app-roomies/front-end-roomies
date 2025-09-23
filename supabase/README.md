# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key
3. Go to Settings > API to find these values

## 2. Configure OAuth Providers

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create OAuth 2.0 Client ID
5. Set authorized redirect URIs:
   - For Expo development: `https://auth.expo.io/@your-username/your-app-slug`
   - For production: `your-app-scheme://oauth`
6. Copy the Client ID

### GitHub OAuth Setup
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL:
   - For Expo development: `https://auth.expo.io/@your-username/your-app-slug`
   - For production: `your-app-scheme://oauth`
4. Copy the Client ID

## 3. Configure Supabase Authentication

1. In your Supabase project, go to Authentication > Providers
2. Enable Google provider and paste your Google Client ID and Secret
3. Enable GitHub provider and paste your GitHub Client ID and Secret
4. **IMPORTANT**: Set the Site URL to your redirect URL:
   - For development: `exp://127.0.0.1:8081` (or your Expo tunnel URL)
   - For production: `com.roomies.app://auth-callback`
5. Add Redirect URLs:
   - Development: `exp://127.0.0.1:8081`
   - Production: `com.roomies.app://auth-callback`
   - Web (if needed): `https://yourapp.com/auth/callback`

### Deep Link Configuration

The app is configured to handle OAuth redirects through deep linking:

- **Custom Scheme**: `com.roomies.app://`
- **Auth Callback Route**: `com.roomies.app://auth-callback`
- **Development**: Uses Expo development server URL for redirects

### Testing Deep Links

1. In development: OAuth should redirect back to the Expo app automatically
2. For production builds: Test with `npx expo run:ios` or `npx expo run:android`
3. You can test deep links manually:
   ```bash
   # iOS Simulator
   xcrun simctl openurl booted "com.roomies.app://auth-callback?access_token=test"
   
   # Android
   adb shell am start -W -a android.intent.action.VIEW -d "com.roomies.app://auth-callback?access_token=test" com.roomies.app
   ```

## 4. Run Database Migration

1. Copy the SQL from `schema.sql`
2. Go to Supabase SQL Editor
3. Paste and run the SQL to create tables and policies

## 5. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:
- `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `EXPO_PUBLIC_GITHUB_CLIENT_ID`: Your GitHub OAuth Client ID
- `EXPO_PUBLIC_APP_SCHEME`: Your app scheme (e.g., com.roomies.app)

## 6. Update app.json

Make sure your `app.json` includes the scheme:

```json
{
  "expo": {
    "scheme": "com.roomies.app"
  }
}
```
