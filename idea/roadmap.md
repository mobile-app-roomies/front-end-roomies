# Roomies Chore App — Trello Import Checklists
 
## List: Environment Setup
- [ ] Create a new Expo project (`npx create-expo-app roomies`)
- [ ] Initialize Git repository and push to GitHub
- [ ] Install dependencies:
  - React Navigation
  - Zustand (or Redux Toolkit)
  - Expo Auth Session
  - Expo Secure Store
  - Expo SQLite
  - React Native Paper / Elements (UI)
- [ ] Configure TypeScript
- [ ] Setup ESLint, Prettier, and Husky pre-commit hooks
 
## List: Atomic Design Architecture
- [ ] Create folders: atoms, molecules, organisms, templates, pages
- [ ] Add design tokens (colors, spacing, typography) in `src/styles`
- [ ] Setup `src/hooks` for custom hooks (`useAuth`, `useChores`, `useTickets`)
- [ ] Setup `src/services` for API, offline sync, notifications
- [ ] Setup `src/navigation` for stack + tab navigators
 
## List: Authentication (OAuth2)
- [ ] Configure Google/GitHub OAuth credentials
- [ ] Implement `expo-auth-session` with PKCE
- [ ] Create `useAuth` hook (login/logout, store tokens in SecureStore)
- [ ] Setup backend (Supabase recommended) for session handling
 
## List: Core App Screens (MVP)
- [ ] Onboarding & Auth screen
- [ ] Home screen (overview, pending chores, ticket balance)
- [ ] Chore Board (assign, complete, track chores)
- [ ] Wallet screen (tickets earned, history)
- [ ] Rewards screen (redeem tickets)
- [ ] Settings screen (dark/light mode, notifications, account)
 
## List: PWA & Offline Support
- [ ] Add `manifest.json` for web
- [ ] Configure Expo for web build
- [ ] Add service worker (Workbox) for caching
- [ ] Implement offline support using `expo-sqlite`
- [ ] Collect Web Vitals (LCP, FID, CLS) and report to analytics
 
## List: Must-Have Features
- [ ] Dark & Light mode toggle
- [ ] OAuth2 Authentication (Google + GitHub)
- [ ] Chore management (CRUD + assignment)
- [ ] Ticket system (earn tickets on completion)
- [ ] Rewards system (redeem tickets)
- [ ] Offline support & sync
- [ ] PWA features: caching, offline usage, web vitals
- [ ] Notifications (local reminders + push for assignments)
 
## List: Optional / Next Steps
- [ ] Leaderboard & streaks
- [ ] Fun animations for chore completion
- [ ] Mini-games for chore swaps
- [ ] Team goals and collaborative rewards
- [ ] Accessibility & performance optimizations