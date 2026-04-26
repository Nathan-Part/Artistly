export interface Artist {
  idArtist: string;
  strArtist: string;
  strArtistThumb: string | null;
  strBiography: string | null;
  strStyle: string | null;
  strGenre: string | null;
  strCountry: string | null;
  strCountryCode: string | null;
  strArtistBanner : string | null;
  strArtistLogo: string | null;
}

export interface ArtistResponse {
  artists: Artist[] | null;
}

export interface TopMusic {
  idTrack: string;
  strTrack: string;
  strAlbum: string;
  strArtist: string;
  strMusicVid: string | null;
  strTrackThumb: string | null;
  intDuration: string | null;
}

export interface TopMusicResponse {
  track: TopMusic[] | null;
}