export interface Artist {
  idArtist: string;
  strArtist: string;
  strArtistThumb: string | null;
  strBiography: string | null;
}

export interface ArtistResponse {
  artists: Artist[] | null;
}
