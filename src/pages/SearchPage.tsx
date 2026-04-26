
import { useEffect, useState } from 'react'
import { findArtist } from '../api/artistApi'
import type { Artist, ArtistResponse } from '../types/artist'

function SearchPage() {
    const [artistResult, setArtistResult] = useState<Artist | null>(null)
    const [artistError, setArtistError] = useState<string | null>(null)

    const loadArtist = async () => {
      try { 
        const data: ArtistResponse = await findArtist()
        setArtistResult(data.artists[0])
      } catch (error) {
        setArtistError(
         'An error occurred while loading the artists. Please try again later.'
        )
      }
      
    }
    
    useEffect(() => {
      loadArtist();
    }, [])

  return (
    <div style={{ marginTop: '2rem', maxWidth: '800px', width: '100%' }}>
        <h2>Resultat de findArtist()</h2>
        {artistError && <p>Erreur: {artistError}</p>}
        {!artistError && artistResult && <p>{artistResult.strArtist}</p>}
    </div>
  );
}

export default SearchPage;
