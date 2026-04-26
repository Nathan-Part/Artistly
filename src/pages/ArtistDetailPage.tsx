import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtistById, getTopMusic } from "../api/artistApi";
import CountryBadge from "../components/CountryBadge";
import StatusMessage from "../components/StatusMessage";
import TopTrackCard from "../components/TopTrackCard";
import type { Artist, ArtistResponse, TopMusic, TopMusicResponse } from "../types/artist";

function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topMusic, setTopMusic] = useState<TopMusic[] | null>(null);
  const [artistError, setArtistError] = useState<string | null>(null);
  const [topMusicError, setTopMusicError] = useState<string | null>(null);
  const [artistLoading, setArtistLoading] = useState(true);

  const loadArtist = async () => {
    if (!id) {
      setArtistError("Artist ID not found.");
      setArtistLoading(false);
      return;
    }

    try {
      setArtistLoading(true);
      setArtistError(null);

      const data: ArtistResponse = await getArtistById(id);

      if (!data.artists || data.artists.length === 0) {
        setArtist(null);
        setArtistError("Artist not found.");
        return;
      }

      setArtist(data.artists[0]);
    } catch {
      setArtist(null);
      setArtistError("An error occurred while loading the artist.");
    } finally {
      setArtistLoading(false);
    }
  };

  const loadTopMusic = async () => {
    if (!artist) {
      return;
    }

    try {
      setTopMusicError(null);

      const dataMusic: TopMusicResponse = await getTopMusic(artist.strArtist);

      if (!dataMusic.track || dataMusic.track.length === 0) {
        setTopMusic(null);
        setTopMusicError("Top music not found.");
        return;
      }

      setTopMusic(dataMusic.track);
    } catch {
      setTopMusic(null);
      setTopMusicError("An error occurred while loading the top music.");
    }
  };

  useEffect(() => {
    loadArtist();
  }, [id]);

  useEffect(() => {
    loadTopMusic();
  }, [artist]);

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

              {artist.strLastFMChart && (
                <a
                  href={artist.strLastFMChart}
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
