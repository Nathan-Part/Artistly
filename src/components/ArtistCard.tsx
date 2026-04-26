import { Link } from "react-router-dom";
import type { Artist } from "../types/artist";
import CountryBadge from "./CountryBadge";

interface ArtistCardProps {
  artist: Artist;
}

function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_-20px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-20px_rgba(15,23,42,0.4)]">
      <div className="relative">
        <img
          className="h-56 w-full object-cover"
          src={artist.strArtistThumb || "https://placehold.co/600x600?text=Artist"}
          alt={artist.strArtist}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        {(artist.strStyle || artist.strGenre) && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {artist.strStyle && (
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                {artist.strStyle}
              </span>
            )}
            {artist.strGenre && (
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                {artist.strGenre}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3 p-5 text-left">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          {artist.strArtist}
        </h2>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          {artist.strCountry && (
            <CountryBadge
              country={artist.strCountry}
              countryCode={artist.strCountryCode}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
              textClassName="break-words"
              flagClassName="h-3.5 w-5 rounded-[2px] object-cover shadow-sm"
            />
          )}

          <Link
            to={`/artist/${artist.idArtist}`}
            className="shrink-0 inline-flex items-center rounded-full bg-[var(--blue)] px-3.5 py-2 text-sm font-medium text-white shadow-[0_10px_24px_-12px_rgba(15,42,92,0.7)] transition duration-300 hover:bg-[var(--purple)] focus:outline-none focus:ring-4 focus:ring-[var(--purple-border)]"
          >
            View details
            <svg
              className="ml-2 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m0 0-4 4m4-4-4-4"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
