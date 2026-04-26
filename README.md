# Artistly

Artistly is a small React application that lets users search for music artists and explore a dedicated detail page with biography, visual assets, and top tracks.

The project uses data from [TheAudioDB](https://www.theaudiodb.com/) and was built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Search artists by name
- Display artist cards with image, country, style, and genre
- Open a detail page for each artist
- Show artist biography, banner, logo, and profile image
- Display top tracks for the selected artist
- Show track duration and video views when available
- Handle missing data cleanly
- Support dark and light mode

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS

## Project Structure

```text
src/
  api/
    artistApi.ts
  assets/
    logo.png
    favicon.png
  pages/
    SearchPage.tsx
    ArtistDetailPage.tsx
  routes/
    AppRouter.tsx
  types/
    artist.tsx
  App.tsx
  main.tsx
  index.css
```

## Routes

- `/`
  Search page

- `/artist/:id`
  Artist detail page

## API

This project uses TheAudioDB API through the following endpoints:

- `search.php?s=...`
  Search artists by name

- `artist.php?i=...`
  Get artist details by id

- `track-top10.php?s=...`
  Get the artist top tracks

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_URL=https://www.theaudiodb.com/api/v1/json/2
```

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Run the Project

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

## Main Pages

### Search Page

The home page allows the user to:

- search for an artist
- press `Enter` to launch the search
- display loading and error states
- browse artist result cards

### Artist Detail Page

The detail page shows:

- artist banner or fallback image
- artist logo and profile image
- biography
- style, genre, and country when available
- LastFM chart link when available
- top 3 tracks
- duration and views when available

## Error Handling

The application includes basic UI handling for:

- artist not found
- top music not found
- API request failure
- loading states on search and artist detail pages

## Assets

- `src/assets/logo.png`
  Main logo used in the interface

- `src/assets/favicon.png`
  Favicon used by the application

## Notes

- Some artist fields depend entirely on the API response, so certain badges or blocks may not appear if data is missing.
- Track views are only displayed when the API provides them.
- Duration falls back to `--:--` when unavailable.

## Author

Project created as a music artist exploration app with React and TypeScript.
