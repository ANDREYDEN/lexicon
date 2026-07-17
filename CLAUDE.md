# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Lexicon is a minimalistic, fully local Expo/React Native app for learning new words — no account, no backend. All data lives on-device in a single JSON file.

## Commands

```bash
npm start          # expo start — dev server (scan QR / press i,a,w)
npm run ios        # expo run:ios
npm run android    # expo run:android
npm run web        # expo start --web
npm run lint       # expo lint (flat config: eslint-config-expo)
npm run prebuild   # expo prebuild — regenerate native ios/android projects
```

There is no test suite configured yet. Typecheck with `npx tsc --noEmit` — this always reports pre-existing errors under `app-example/` (unused Expo template scaffold, safe to ignore); scope real checks to `src/` with `npx tsc --noEmit 2>&1 | grep '^src/'`.

When adding a new Expo module, install it with `npx expo install <package>` (not plain `npm install`) so the version matches the current Expo SDK (54).

## Architecture

**Platforms**: the app is designed to run on mobile (iOS and Android) and not web, so do not check for or attempt to run the app on web.

**Routing**: `expo-router` with typed routes (`experiments.typedRoutes` in `app.json`). Route files under `src/app/` are thin — each just re-exports a component from `src/screens/`. All screens are registered as `Stack.Screen` entries in `src/app/_layout.tsx`, which is also where header buttons (e.g. gear icon → settings, plus icon → add word) are wired up via `headerLeft`/`headerRight`.

**State**: One global context, `WordsContext` (`src/providers/wordsProvider.tsx`), wraps the whole app and holds the in-memory `words` array plus actions (`loadWords`, `createWord`, `deleteWord`, `importWords`). Screens read/mutate words only through this context — never call `wordRepository` directly from a screen. Words are loaded once at startup (see `useSplashScreen`, which gates rendering behind `loadWords()` and hides the splash screen when ready).

**Persistence**: `src/services/wordRepository.ts` is the sole owner of on-disk storage, using the `expo-file-system` `File`/`Paths` API to read/write a single `words.json` in the document directory. It exposes `getAll`, `create`, `remove`, `replaceAll` — every context action pairs an optimistic in-memory update with a matching repository call.

**Import/Export**: `src/services/ioService.ts` handles both directions: `exportWords` serializes the current words to a temp file (`expo-file-system` cache dir) and hands it off via `expo-sharing`; `pickWords` uses `expo-document-picker` to select a JSON file, then validates its shape (array of objects with string `content`/`definition`/`createdAt`) before returning, throwing `ioService.ImportError` with a user-facing message on bad input. The settings screen (`src/screens/SettingsScreen.tsx`) is the only caller — it confirms destructive imports with a native `Alert` before calling `importWords`.

**Components**: Shared primitives (`LxButton`, `LxTextInput`, `LxTextArea`) live in `src/components/` and are styled with inline `StyleSheet.create` objects per-file — there is no shared theme/design-token system yet (see README TODO: "Theming & Dark mode"). Screen-specific components (e.g. `WordListItem`) live alongside their screen under `src/screens/<Screen>/components/`.

**Word identity**: `Word.content` (the word text itself) is currently used as the unique key/identifier throughout (`keyExtractor`, delete-by-content lookups) — there is no separate id field.
