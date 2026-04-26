# Artistly

Artistly is a React application that lets users search for music artists and open a dedicated detail page with biography, images, metadata, and top tracks.

The project uses data from [TheAudioDB](https://www.theaudiodb.com/) and is built with React, TypeScript, Vite, React Router, and Tailwind CSS.

## Features

- Search artists by name
- Display artist cards with image, country, style, and genre
- Open a detail page for each artist
- Show artist biography, banner, logo, and profile image
- Display the artist's top tracks
- Show track duration and video views when available
- Handle loading, error, and empty states
- Reuse small UI components to keep pages easier to read

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- ESLint

## Project Structure

```text
src/
  api/
    artistApi.ts
  assets/
    hero.png
    logo.png
    react.svg
    vite.svg
  components/
    ArtistCard.tsx
    CountryBadge.tsx
    SearchBar.tsx
    StatusMessage.tsx
    TopTrackCard.tsx
  pages/
    ArtistDetailPage.tsx
    NotFoundPage.tsx
    SearchPage.tsx
  routes/
    AppRouter.tsx
  types/
    artist.ts
  App.tsx
  index.css
  main.tsx
```

## Routes

- `/`
  Search page

- `/artist/:id`
  Artist detail page

- `*`
  Not found page

## API

This project uses TheAudioDB API through these endpoints:

- `search.php?s=...`
  Search artists by name

- `artist.php?i=...`
  Get artist details by id

- `track-top10.php?s=...`
  Get the top tracks for an artist

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_URL=https://www.theaudiodb.com/api/v1/json/2
```

## Installation

Install dependencies:

```bash
npm install
```

## Available Scripts

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Pages

### Search Page

The home page allows the user to:

- search for an artist
- press `Enter` to launch the search
- reset the current search
- display loading and error states
- browse artist result cards

### Artist Detail Page

The detail page shows:

- artist banner or fallback image
- artist logo and profile image
- biography
- style, genre, country, label, and formed year when available
- LastFM chart link when available
- top tracks
- duration and views when available

## Components

The interface now uses small reusable components:

- `SearchBar`
  Handles the search input and action buttons

- `ArtistCard`
  Displays a single artist result

- `CountryBadge`
  Displays a country with its flag when available

- `StatusMessage`
  Reusable UI for loading, warning, and error messages

- `TopTrackCard`
  Displays track information and the video link only when available

## Notes

- Some fields depend entirely on the API response, so certain blocks may not appear for every artist.
- Track duration falls back to `--:--` when unavailable.
- Artist and track images use placeholders when the API does not return an image.
- API responses are typed in TypeScript, but the page logic stays intentionally simple and easy to follow.

## Author

Created by Nathan Partouche.
