# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo Router. The app is called "superCours" and uses file-based routing for navigation with a tab-based architecture.

## Development Commands

- `npm start` or `npx expo start` - Start the Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint for code quality checks
- `npm run reset-project` - Reset project to clean state (moves starter code to app-example)

## Architecture

### Routing Structure
- Uses Expo Router with file-based routing
- Main layout: `app/_layout.tsx` (root layout with Stack navigation)
- Tab navigation: `app/(tabs)/` directory contains:
  - `_layout.tsx` - Tab layout configuration
  - `index.tsx` - Home/main tab
  - `explore.tsx` - Explore tab

### Key Directories
- `app/` - Main application screens using Expo Router
- `components/` - Reusable React components following Atomic Design methodology
  - `atoms/` - Basic building blocks (buttons, inputs, text elements)
  - `molecules/` - Simple combinations of atoms (search bar, card header)
  - `organisms/` - Complex UI components (navigation, forms, content sections)
  - `templates/` - Page-level layouts and structures
  - `ui/` - UI-specific utility components
  - Component files like `themed-text.tsx`, `themed-view.tsx` for theming
- `hooks/` - Custom React hooks (theme, color scheme utilities)
- `constants/` - App constants including theme definitions

### Theme System
- Dark/light theme support with automatic detection
- Custom hooks: `use-color-scheme.ts`, `use-theme-color.ts`
- Themed components in `components/` directory

### Key Technologies
- Expo SDK ~54.0.10
- React 19.1.0
- React Native 0.81.4
- TypeScript with strict mode
- React Navigation v7
- React Native Reanimated for animations
- Expo Router for navigation

## Configuration

### TypeScript
- Extends `expo/tsconfig.base`
- Strict mode enabled
- Path aliases: `@/*` maps to project root

### ESLint
- Uses `eslint-config-expo`
- Ignores `dist/*` directory

### Expo Configuration
- New Architecture enabled
- Typed routes enabled
- React Compiler experimental feature enabled
- Supports iOS tablets and Android adaptive icons
- Edge-to-edge Android layout

## Development Notes

- The project uses Expo's new file-based routing system
- All screens should be placed in the `app/` directory
- Use the themed components for consistent styling across light/dark modes
- Path imports use `@/` prefix for cleaner imports from project root

## Component Organization (Atomic Design)

When creating new components, follow the Atomic Design methodology:

### Atoms (`components/atoms/`)
- Single-purpose, basic UI elements
- Examples: Button, Input, Text, Icon, Avatar
- Should not have margins or positioning
- Highly reusable across the application

### Molecules (`components/molecules/`)
- Combinations of atoms that work together
- Examples: SearchInput (Input + Icon), ListItem (Avatar + Text + Button)
- Still relatively simple and reusable

### Organisms (`components/organisms/`)
- Complex components built from atoms and molecules
- Examples: Header, NavigationBar, ProductList, UserProfile
- Represent distinct sections of an interface

### Templates (`components/templates/`)
- Page-level layout structures
- Define content placement without specific content
- Examples: AuthTemplate, DashboardTemplate, SettingsTemplate

When adding new components, place them in the appropriate atomic level and ensure they follow the existing theming patterns.