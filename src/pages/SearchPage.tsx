
import { useState } from 'react'
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
    <div style={{ marginTop: '2rem', maxWidth: '800px', width: '100%' }}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for an artist..." />
        <button onClick={loadArtist}>Search</button>
        {artistError && <p>{artistError}</p>}
        {!artistError && artistResults?.map((artist) => (
            <div key={artist.idArtist}>
              <p>{artist.strArtist}</p>
              <p>{artist.strBiography}</p>
              <img src={artist.strArtistThumb || ''} alt={artist.strArtist} />
            </div>
        ))}
    </div>
  );
}

export default SearchPage;
