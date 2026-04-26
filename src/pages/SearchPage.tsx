
import { useState } from 'react'
import { searchArtists } from '../api/artistApi'
import type { Artist, ArtistResponse } from '../types/artist'

function SearchPage() {
    const [artistResult, setArtistResult] = useState<Artist | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [artistError, setArtistError] = useState<string | null>(null)

    const loadArtist = async () => {
      try { 
        const data: ArtistResponse = await searchArtists(searchTerm)
        setArtistResult(data.artists[0])
      } catch (error) {
        setArtistError(
         'An error occurred while loading the artists. Please try again later.'
        )
      }
      
    }

  return (
    <div style={{ marginTop: '2rem', maxWidth: '800px', width: '100%' }}>
        {artistError && <p>Error: {artistError}</p>}

        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for an artist..." />
        <button onClick={loadArtist}>Search</button>
        {!artistError && artistResult && (
            <>
            <p>{artistResult.strArtist}</p>
            <p>{artistResult.strBiography}</p>
            <img src={artistResult.strArtistThumb || ''} alt={artistResult.strArtist} />
            </>
        )}
    </div>
  );
}

export default SearchPage;
