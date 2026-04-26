const API_URL = import.meta.env.VITE_API_URL

export async function findArtist() {
    try {
        const response = await fetch(`${API_URL}Coldplay`)
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error finding artists:", error)
        throw error
    }
}

export async function searchArtists(query: string) {
    try {
        const response = await fetch(`${API_URL}${query}`)
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

