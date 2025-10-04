# Pokemon Explorer

A modern, production-ready Pokemon Explorer built with React, TypeScript, and Vite.

## API Used

**PokéAPI** (https://pokeapi.co)
- Provides comprehensive Pokemon data including images, types, abilities, and stats
- RESTful API with no authentication required
- Supports pagination and detailed Pokemon information

## Features Implemented

### ✅ Core Requirements

1. **Search & Filter**
   - Debounced global search (300ms delay)
   - Filter by Pokemon type (18 types + "all")
   - Real-time search with request cancellation

2. **List & Detail Views**
   - Grid layout with Pokemon cards showing thumbnails and basic info
   - Click any card to open detailed view modal
   - Detail page shows: stats, abilities, physical attributes, types

3. **Infinite Scroll**
   - Loads 20 Pokemon at a time
   - Automatically fetches more when scrolling near bottom
   - Loading states for better UX

4. **Favorites System**
   - Mark/unmark favorites with heart icon
   - Persists in localStorage
   - Dedicated favorites page
   - Bulk remove with "Clear All" button

5. **Sorting**
   - ID (Low to High / High to Low)
   - Name (A-Z / Z-A)

6. **Performance & UX**
   - Debounced search (300ms)
   - Request cancellation for stale searches
   - Client-side caching for API responses
   - Smooth animations and transitions
   - Loading and error states

7. **Code Quality**
   - Modular component architecture
   - Custom hooks (useSearch, usePokemon)
   - Global state via Context API
   - Clean folder structure
   - Type-safe with TypeScript

8. **Tests**
   - Unit tests for useSearch hook
   - Component tests for PokemonCard
   - Uses Vitest + React Testing Library

## Getting Started

### Prerequisites
- Node.js v20.18.0 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PokemonCard.tsx
│   ├── SearchBar.tsx
│   ├── Filters.tsx
│   └── PokemonDetail.tsx
├── context/            # Global state management
│   └── PokemonContext.tsx
├── hooks/              # Custom React hooks
│   ├── usePokemon.ts
│   └── useSearch.ts
├── lib/                # API utilities
│   └── api.ts
├── pages/              # Page components
│   ├── Home.tsx
│   └── Favorites.tsx
├── types/              # TypeScript types
│   └── pokemon.ts
├── utils/              # Helper functions
│   └── helpers.ts
└── test/               # Test configuration
    └── setup.ts
```

## Design Decisions

### State Management
**Chose Context API** over Redux because:
- Simpler setup for this app size
- Built-in to React, no extra dependencies
- Sufficient for favorites and filter state
- Easy to test and maintain

### Caching Strategy
- In-memory Map for API response caching
- Reduces unnecessary API calls
- Improves performance for repeated queries
- Cache persists during session

### Search Implementation
- Debouncing prevents excessive API calls
- Request cancellation avoids race conditions
- Shows loading state for better UX

### Infinite Scroll
- Chosen over pagination for better mobile UX
- Loads data on scroll using scroll events
- Prefetches when user reaches 150% of visible height

## Assumptions

1. **Network Reliability**: Assumes stable internet connection for API calls
2. **Browser Support**: Modern browsers with localStorage support
3. **API Availability**: PokéAPI is publicly available and reliable
4. **Data Volume**: Limited to first 1000 Pokemon for search functionality
5. **Image Loading**: Assumes Pokemon images are available and load successfully

## What I Would Improve Next

1. **Advanced Features**
   - Add Pokemon comparison view
   - Evolution chain visualization
   - Battle calculator

2. **Performance**
   - Implement virtual scrolling with react-window for large lists
   - Add service worker for offline support
   - Image lazy loading and optimization

3. **Testing**
   - Increase test coverage to 80%+
   - Add E2E tests with Playwright
   - Integration tests for API layer

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Data Fetching**: Axios + SWR
- **Testing**: Vitest + React Testing Library
- **Styling**: Inline styles (for simplicity)