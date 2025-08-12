# Project Structure

This document outlines the organization of the FIVE v3 Sports Trivia MVP codebase.

## Directory Structure

```
five-v3-mvp/
├── app/                   # Expo Router application entry point
│   ├── (modals)/          # Modal screen components
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout component
│   └── index.tsx          # Main entry point
│
├── src/                   # Source code
│   ├── mock/              # Mock data for development
│   ├── providers/         # React context providers
│   ├── state/             # Zustand store and state management
│   ├── test/              # Test components and utilities
│   ├── theme/             # Theme configuration
│   │   ├── colors.ts      # Color definitions
│   │   └── index.ts       # Main theme export
│   ├── types/             # TypeScript types and interfaces
│   ├── ui/                # Reusable UI components
│   └── utils/             # Utility functions and helpers
│
├── assets/                # Static assets (images, fonts)
└── ios/                   # Native iOS files
```

## Key Files

- `app.json` & `app.config.js`: Expo configuration
- `babel.config.js`: Babel configuration with worklets support
- `metro.config.js`: Metro bundler configuration
- `tsconfig.json`: TypeScript configuration
- `package.json`: Project dependencies and scripts

## Code Organization Principles

1. **Component Structure**: UI components are in `src/ui/`, screens in `app/`
2. **State Management**: Global state managed with Zustand in `src/state/`
3. **Theming**: Theme tokens centralized in `src/theme/`
4. **Navigation**: Handled by Expo Router in `app/` directory
5. **Data Flow**: Mock data in `src/mock/`, real data via APIs
