const API_URL = import.meta.env.VITE_API_URL

export async function searchArtists(search: string) {
    try { 
        const response = await fetch(`${API_URL}/search.php?s=${encodeURIComponent(search)}`)
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error searching artists:", error)
        throw error
    }
}

export async function getArtistById(id: string) {
    try {
        const response = await fetch(`${API_URL}/artist.php?i=${encodeURIComponent(id)}`)
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching artist details:", error)
        throw error
    }
}

export async function getTopMusic(search: string) {
     try { 
        const response = await fetch(`${API_URL}/track-top10.php?s=${encodeURIComponent(search)}`)
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error finding top music:", error)
        throw error
    }
}
