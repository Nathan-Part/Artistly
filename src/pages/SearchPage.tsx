
import { useEffect, useState } from 'react'
import { findArtist } from '../api/artistApi'

function SearchPage() {
        const [artistResult, setArtistResult] = useState<any>(null)
    const [artistError, setArtistError] = useState<string | null>(null)

    const loadArtist = async () => {
      try { 
        const data = await findArtist()
        setArtistResult(data)
      } catch (error) {
        setArtistError(
         'An error occurred while loading the artists. Please try again later.'
        )
      }
      
    }
    
    useEffect(() => {
      loadArtist();
    })

  return (
    <div style={{ marginTop: '2rem', maxWidth: '800px', width: '100%' }}>
        <h2>Resultat de findArtist()</h2>
        {artistError && <p>Erreur: {artistError}</p>}
        {!artistError && (
        
            JSON.stringify(artistResult, null, 2)
        )}
    </div>
  );
}

export default SearchPage;