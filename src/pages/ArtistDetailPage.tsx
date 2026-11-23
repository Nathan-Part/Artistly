import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtistById, getTopMusic } from "../api/artistApi";
import CountryBadge from "../components/CountryBadge";
import StatusMessage from "../components/StatusMessage";
import TopTrackCard from "../components/TopTrackCard";
import type { Artist, ArtistResponse, TopMusic, TopMusicResponse } from "../types/artist";
import { safeHttpUrl } from "../utils/safeUrl";

function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [artistState, setArtistState] = useState<{
    id?: string;
    artist: Artist | null;
    error: string | null;
  }>({ artist: null, error: null });
  const [musicState, setMusicState] = useState<{
    name?: string;
    tracks: TopMusic[] | null;
    error: string | null;
  }>({ tracks: null, error: null });

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;

    getArtistById(id)
      .then((data: ArtistResponse) => {
        if (cancelled) return;
        const found = data.artists?.[0] ?? null;
        setArtistState({ id, artist: found, error: found ? null : "Artist not found." });
      })
      .catch(() => {
        if (cancelled) return;
        setArtistState({ id, artist: null, error: "An error occurred while loading the artist." });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const isCurrentArtist = artistState.id === id;
  const artist = isCurrentArtist ? artistState.artist : null;
  const artistError = !id ? "Artist ID not found." : isCurrentArtist ? artistState.error : null;
  const artistLoading = Boolean(id) && !isCurrentArtist;
  const artistName = artist?.strArtist;

  useEffect(() => {
    if (!artistName) {
      return;
    }

    let cancelled = false;

    getTopMusic(artistName)
      .then((dataMusic: TopMusicResponse) => {
        if (cancelled) return;
        const tracks = dataMusic.track && dataMusic.track.length > 0 ? dataMusic.track : null;
        setMusicState({ name: artistName, tracks, error: tracks ? null : "Top music not found." });
      })
      .catch(() => {
        if (cancelled) return;
        setMusicState({
          name: artistName,
          tracks: null,
          error: "An error occurred while loading the top music.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [artistName]);

  const isCurrentMusic = musicState.name === artistName;
  const topMusic = isCurrentMusic ? musicState.tracks : null;
  const topMusicError = isCurrentMusic ? musicState.error : null;

  useEffect(() => {
    if (artist?.strArtist) {
      document.title = `Artistly | ${artist.strArtist}`;
      return;
    }

    document.title = "Artistly | Artist Details";
  }, [artist]);

  const formatDuration = (ms: string | null) => {
    if (!ms) {
      return "--:--";
    }

    let second = Math.floor(Number(ms) / 1000);
    const minute = Math.floor(second / 60);
    second -= minute * 60;

    return `${minute}:${second.toString().padStart(2, "0")}`;
  };

  const artistBannerImage =
    artist?.strArtistBanner ||
    artist?.strArtistWideThumb ||
    artist?.strArtistFanart ||
    artist?.strArtistThumb ||
    `https://placehold.co/1400x500?text=${artist?.strArtist || "Artist"}`;

  if (artistLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <StatusMessage message="Loading artist..." />
      </div>
    );
  }

  if (artistError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <StatusMessage message={artistError} tone="error" />
      </div>
    );
  }

  if (!artist) {
    return null;
  }

  const lastFmChartUrl = safeHttpUrl(artist.strLastFMChart);

  return (
    <div className="min-h-screen bg-transparent py-8 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <Link
          to="/"
          className="inline-flex w-fit rounded-full border border-slate-700 bg-[#1b1d26] px-5 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
        >
          Back to search
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[#11131b] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
          <div className="relative flex min-h-[260px] w-full items-center justify-center bg-[#0b0d16] px-4 py-6 sm:min-h-[340px]">
            <img
              src={artistBannerImage}
              alt={artist.strArtist}
              className="max-h-[55vh] w-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl font-bold text-white sm:text-5xl">
                {artist.strArtist}
              </h1>
              <div className="mt-4 flex flex-wrap gap-3">
                {artist.strStyle && (
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                    {artist.strStyle}
                  </span>
                )}
                {artist.strGenre && (
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                    {artist.strGenre}
                  </span>
                )}
                {artist.strCountry && (
                  <CountryBadge
                    country={artist.strCountry}
                    countryCode={artist.strCountryCode}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                    flagClassName="h-4 w-6 rounded-sm object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="items-start gap-8 p-6 md:grid md:grid-cols-[280px_1fr] md:p-8">
            <div className="self-start rounded-3xl border border-slate-800 bg-[#181b24] p-4">
              {artist.strArtistLogo && (
                <div className="mb-4 rounded-2xl border border-slate-700 bg-[#0f1118] p-4">
                  <img
                    src={artist.strArtistLogo}
                    alt={`${artist.strArtist} logo`}
                    className="max-h-20 w-full object-contain"
                  />
                </div>
              )}

              <img
                src={artist.strArtistThumb || `https://placehold.co/600x600?text=${artist.strArtist}`}
                alt={artist.strArtist}
                className="h-72 w-full rounded-2xl object-cover shadow-md"
              />

              {lastFmChartUrl && (
                <a
                  href={lastFmChartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Open LastFM chart
                </a>
              )}
            </div>

            <div className="self-start space-y-6">
              {(artist.intFormedYear || artist.strLabel) && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {artist.intFormedYear && (
                    <div className="rounded-2xl border border-slate-700 bg-[#10131a] p-4 text-left">
                      <p className="text-sm font-medium text-slate-400">Formed year</p>
                      <p className="mt-2 text-lg font-semibold text-slate-100">
                        {artist.intFormedYear}
                      </p>
                    </div>
                  )}

                  {artist.strLabel && (
                    <div className="rounded-2xl border border-slate-700 bg-[#10131a] p-4 text-left">
                      <p className="text-sm font-medium text-slate-400">Label</p>
                      <p className="mt-2 text-lg font-semibold text-slate-100">
                        {artist.strLabel}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-semibold text-slate-50">About the artist</h2>
                <p className="mt-3 leading-7 text-slate-300">
                  {artist.strBiography || "No biography available."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-800 bg-[#11131b] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)] md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
                Popular tracks
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">Top Music</h2>
            </div>
          </div>

          {topMusicError && <StatusMessage message={topMusicError} tone="warning" />}

          {!topMusicError && topMusic && (
            <ul className="grid gap-5 md:grid-cols-3">
              {topMusic.slice(0, 3).map((music) => (
                <TopTrackCard
                  key={music.idTrack}
                  track={music}
                  formatDuration={formatDuration}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default ArtistDetailPage;
