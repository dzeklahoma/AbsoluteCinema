export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  videos: {
    results: Video[];
  };
  similar: {
    results: Movie[];
  };
}