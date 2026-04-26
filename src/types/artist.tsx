export interface Artist {
  idArtist: string;
  strArtist: string;
  strArtistThumb: string | null;
  strBiography: string | null;
  strStyle: string | null;
  strGenre: string | null;
  strCountry: string | null;
  strCountryCode: string | null;
}

export interface ArtistResponse {
  artists: Artist[] | null;
}
