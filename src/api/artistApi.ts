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

