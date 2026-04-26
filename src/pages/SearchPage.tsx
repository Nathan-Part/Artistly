
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { searchArtists } from '../api/artistApi'
import type { Artist, ArtistResponse } from '../types/artist'

function SearchPage() {
    const [artistResults, setArtistResults] = useState<Artist[] | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [artistError, setArtistError] = useState<string | null>(null)

    const loadArtist = async () => {
      try { 
        setArtistError(null)
        const data: ArtistResponse = await searchArtists(searchTerm)
        if (!data.artists || data.artists.length === 0 || searchTerm.trim() === '') {
          setArtistResults(null)
          setArtistError('Artist not found.')
          return
        }
        setArtistResults(data.artists)
      } catch (error) {
        setArtistError(
         'An error occurred while loading the artists. Please try again later.'
        )
        setArtistResults(null)
      }
      
    }
    
  return (
    <div style={{ marginTop: '2rem', maxWidth: '1100px', width: '100%' }}>
        <div className="mb-6 flex flex-col gap-3 rounded-[2rem] border border-slate-800 bg-[#0b0d16] p-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 px-3 text-slate-400">
            <span className="shrink-0 text-2xl leading-none">⌕</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for an artist..."
              className="w-full bg-transparent py-2 text-lg text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <button
            onClick={loadArtist}
            className="rounded-[1.6rem] bg-slate-800 px-8 py-3 text-lg font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-600"
          >
            Search
          </button>
        </div>
        {artistError && <p>{artistError}</p>}
        {!artistError && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {artistResults?.map((artist) => (
            <div
              key={artist.idArtist}
              className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_-20px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-20px_rgba(15,23,42,0.4)]"
            >
                <div className="relative">
                    <img
                      className="h-56 w-full object-cover"
                      src={artist.strArtistThumb || 'https://placehold.co/600x600?text=Artist'}
                      alt={artist.strArtist}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                        {artist.strStyle}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                        {artist.strGenre}
                      </span>
                    </div>
                </div>
                <div className="space-y-3 p-5 text-left">
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                        {artist.strArtist}
                      </h2>
                    </div>
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                        {artist.strCountryCode && (
                          <img
                            src={`https://flagcdn.com/w40/${artist.strCountryCode.toLowerCase()}.png`}
                            alt={`${artist.strCountry || 'Country'} flag`}
                            className="h-3.5 w-5 rounded-[2px] object-cover shadow-sm"
                          />
                        )}
                        <span className="break-words">{artist.strCountry || 'Unknown country'}</span>
                      </span>
                      <Link
                        to="/details/"
                        className="shrink-0 inline-flex items-center rounded-full bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
                      >
                        View details
                        <svg className="ml-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0-4 4m4-4-4-4"/></svg>
                      </Link>
                    </div>
                </div>
            </div>
            ))}
          </div>
        )}
    </div>
    
    
  );
}

export default SearchPage;
