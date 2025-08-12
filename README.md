# FIVE v3 - Sports Trivia MVP

A beautiful, production-ready sports trivia app with live picks functionality built with Expo and React Native.

## Features

- 🎮 Browse live, upcoming, and completed games
- ⚡ Join live games and answer timed trivia questions
- 💰 Coin-based wagering system with streak tracking
- 🏆 User profile with achievements and statistics
- 🎨 Clean, modern design system with consistent theming
- 📱 Fully responsive and cross-platform (iOS/Android/Web)

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

## Project Structure

```
src/
├── theme.ts           # Design system tokens
├── types/             # TypeScript type definitions
├── ui/                # Reusable UI components
├── state/             # Zustand store
├── mock/              # Mock data and runner
└── providers/         # React context providers

app/
├── (tabs)/           # Tab navigation screens
│   ├── games.tsx     # Home/games list
│   ├── live.tsx      # Live game details
│   └── profile.tsx   # User profile
├── (modals)/         # Modal screens
│   └── question.tsx  # Question answering modal
└── _layout.tsx       # Root layout
```

## Configuration

### Mock Data Toggle

To enable/disable the mock question runner, edit `src/mock/mockRunner.ts`:

```typescript
const USE_MOCK = true; // Set to false to disable
```

### Theme Customization

All design tokens are centralized in `src/theme.ts`. Modify colors, typography, spacing, and radii there.

## Key Components

- **GameTile**: Displays game cards with team logos and scores
- **CountdownCard**: Shows countdown timer with visual progress
- **ResultCard**: Shows pick results with coin deltas
- **TeamLogo**: Renders team logos with monogram fallback
- **SegmentedTabs**: Tab switcher for content sections

## State Management

The app uses Zustand for state management with the following key actions:

- `joinGame(gameId)`: Join a live game
- `submitPick(questionId, optionId, wager)`: Submit an answer
- `mockResolve(questionId, correctOptionId)`: Resolve a question (mock)

## Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## Development Notes

- Mock runner cycles questions every 45 seconds in development
- Questions lock after 10 seconds and resolve after 15 seconds
- Haptic feedback is triggered on correct/incorrect picks
- All touch targets meet 44px minimum for accessibility

## Screenshots

1. **Games Screen**: Browse all available games with live status indicators
2. **Live Game**: View game details, countdown timer, and pick history
3. **Question Modal**: Answer timed questions with wager selection
4. **Profile**: View coin balance, streaks, and achievements
5. **Result Cards**: See pick outcomes with coin changes

## License

MIT