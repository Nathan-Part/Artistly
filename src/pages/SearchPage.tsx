import { useState } from "react";
import { searchArtists } from "../api/artistApi";
import logo from "../assets/logo.png";
import ArtistCard from "../components/ArtistCard";
import SearchBar from "../components/SearchBar";
import type { Artist, ArtistResponse } from "../types/artist";

function SearchPage() {
  const [artistResults, setArtistResults] = useState<Artist[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [artistError, setArtistError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetFilters = () => {
    setSearchTerm("");
    setArtistResults(null);
    setArtistError(null);
  };

  const loadArtist = async () => {
    try {
      setLoading(true);
      setArtistError(null);

      const data: ArtistResponse = await searchArtists(searchTerm);

      if (!data.artists || data.artists.length === 0) {
        setArtistResults(null);
        setArtistError("Artist not found.");
        return;
      }

      setArtistResults(data.artists);
    } catch {
      setArtistError(
        "An error occurred while loading the artists. Please try again later."
      );
      setArtistResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem", maxWidth: "1100px", width: "100%" }}>
      <div className="mb-5 flex flex-col items-center">
        <img
          src={logo}
          alt="Artistly logo"
          className="mb-2 h-auto w-full max-w-[360px] object-contain"
        />
        <p className="mb-4 max-w-2xl text-center text-sm leading-6 text-slate-400 sm:text-base">
          Search for your favorite artists and explore their albums, biographies, and tracks.
        </p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={loadArtist}
        onReset={resetFilters}
      />

      {loading && <p>Loading artists...</p>}
      {artistError && !loading && <p>{artistError}</p>}
      {!artistError && !loading && (
        <>
          <p className="mb-6 text-center text-sm font-medium text-slate-500">
            {artistResults && artistResults.length > 0 && `${artistResults.length} artists found`}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {artistResults?.map((artist) => (
              <ArtistCard key={artist.idArtist} artist={artist} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;
