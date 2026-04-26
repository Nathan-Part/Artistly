export interface Artist {
  idArtist: string;
  strArtist: string;
  strArtistThumb: string | null;
  strBiographyEN: string | null;
}

export interface ArtistResponse {
    artists: Artist[];
}