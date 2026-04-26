import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtistById, getTopMusic } from "../api/artistApi";
import type { Artist, TopMusic, ArtistResponse, TopMusicResponse } from "../types/artist";

function ArtistDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [artist, setArtist] = useState<Artist | null>(null);
    const [topMusic, setTopMusic] = useState<TopMusic[] | null>(null);
    const [artistError, setArtistError] = useState<string | null>(null);
    const [topMusicError, setTopMusicError] = useState<string | null>(null)

    const loadArtist = async () => {
        if (!id) {
            setArtistError("Artist ID not found.");
            return;
        }

        try {
            setArtistError(null);
            const data: ArtistResponse = await getArtistById(id);
            console.log(data)
            if (!data.artists || data.artists.length === 0) {
                setArtist(null);
                setArtistError("Artist not found.");
                return;
            }

            setArtist(data.artists[0]);
        } catch {
            setArtist(null);
            setArtistError("An error occurred while loading the artist.");
        } 
    };

    const loadTopMusic = async () => {
        if (!artist) {
            console.log(artist);
            setTopMusicError("top music not found.");
            return;
        }

        try {
            setTopMusicError(null);
            const dataMusic: TopMusicResponse = await getTopMusic(artist.strArtist);

            if (!dataMusic.track || dataMusic.track.length === 0) {
                setTopMusicError("Top music not found.");
                return;
            }

            setTopMusic(dataMusic.track);
        } catch {
            setArtist(null);
            setTopMusicError("An error occurred while loading the top music.");
        } 
    }
    
    useEffect(() => {
        loadArtist();
    }, [id]);

    useEffect(() => {
        loadTopMusic();
    }, [artist]);

    const formatDuration = (ms: string | null) => {
        let seconde = Math.floor(Number(ms) / 1000);
        let minute = Math.floor(seconde / 60);
        seconde = seconde - (minute * 60);
        return `${minute}:${seconde.toString().padStart(2, '0')}`;
    }

    if (artistError) {
        return (
            <div>
                <p>{artistError}</p>
                <Link to="/">Back to search</Link>
            </div>
        );
    }

    if (!artist) {
        return (
            <div>
                <p>No artist data available.</p>
                <Link to="/">Back to search</Link>
            </div>
        );
    }

    return (
    <>
        <div>
            <Link to="/">Back to search</Link>

            {artist.strArtistBanner && (
                <img
                    src={artist.strArtistBanner}
                    alt={artist.strArtist}
                    width="100%" />
            )}

            {artist.strArtistLogo && (
                <img
                    src={artist.strArtistLogo}
                    alt={artist.strArtist}
                    width="100%" />
            )}

            <h1>{artist.strArtist}</h1>

            {artist.strArtistThumb && (
                <img
                    src={artist.strArtistThumb}
                    alt={artist.strArtist}
                    width="300" />
            )}

            <p><strong>Style:</strong> {artist.strStyle || "Unknown"}</p>
            <p><strong>Genre:</strong> {artist.strGenre || "Unknown"}</p>
            <p><strong>Country:</strong>
                {artist.strCountryCode && (
                    <img
                        src={`https://flagcdn.com/w40/${artist.strCountryCode.toLowerCase()}.png`}
                        alt={`${artist.strCountry || 'Country'} flag`}
                        className="h-3.5 w-5 rounded-[2px] object-cover shadow-sm" />
                )}
                {artist.strCountry || "Unknown"}</p>

            <h2>Biography</h2>
            <p>{artist.strBiography || "No biography available."}</p>
        </div>
        <div>
            <h2>Top Music</h2>
            {!topMusicError && topMusic && (
            <ul>
                {topMusic.slice(0, 3).map((music) => (
                    <li key={music.idTrack}>
                        <p><strong>{music.strTrack}</strong></p>
                        <p>{music.strAlbum}</p>
                        <Link to={music.strMusicVid || "#"} target="_blank" rel="noopener noreferrer">Watch Video</Link>
                        <p>{formatDuration(music.intDuration)}</p>
                            <img
                                src={music.strTrackThumb || `https://placehold.co/600x600?text=${music.strTrack}`}
                                alt={music.strTrack}
                                width="200" />
                    </li>
                ))}

            </ul>
            )}
             {topMusicError && <p>{topMusicError}</p>}
        </div>
    </>
    );
}

export default ArtistDetailPage;
