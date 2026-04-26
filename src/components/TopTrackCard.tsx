import type { TopMusic } from "../types/artist";

interface TopTrackCardProps {
  track: TopMusic;
  formatDuration: (duration: string | null) => string;
}

function TopTrackCard({ track, formatDuration }: TopTrackCardProps) {
  return (
    <li className="overflow-hidden rounded-3xl border border-slate-800 bg-[#181b24] shadow-sm">
      <img
        src={track.strTrackThumb || `https://placehold.co/600x600?text=${track.strTrack}`}
        alt={track.strTrack}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xl font-semibold text-slate-50">{track.strTrack}</p>
          <p className="mt-1 text-sm text-slate-400">
            {track.strAlbum || "Unknown album"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#10131a] px-4 py-3 text-sm text-slate-400">
          <div className="flex items-center justify-between">
            <span>Duration</span>
            <span className="font-semibold text-slate-100">
              {formatDuration(track.intDuration)}
            </span>
          </div>
          {track.intMusicVidViews && (
            <div className="mt-2 flex items-center justify-between">
              <span>Views</span>
              <span className="font-semibold text-slate-100">
                {`${Number(track.intMusicVidViews).toLocaleString()} views`}
              </span>
            </div>
          )}
        </div>

        {track.strMusicVid && (
          <a
            href={track.strMusicVid}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Watch video
          </a>
        )}
      </div>
    </li>
  );
}

export default TopTrackCard;
