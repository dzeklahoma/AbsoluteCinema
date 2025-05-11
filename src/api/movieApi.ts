import axios from 'axios';
import { Movie, MovieDetails, Genre } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Function to get image URL with specified size
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Get trending movies for homepage
export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Get popular movies
export const getPopularMovies = async (page: number = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page },
    });
    return { 
      movies: response.data.results, 
      totalPages: response.data.total_pages 
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { movies: [], totalPages: 0 };
  }
};

// Get top rated movies
export const getTopRatedMovies = async (page: number = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    const response = await api.get('/movie/top_rated', {
      params: { page },
    });
    return { 
      movies: response.data.results, 
      totalPages: response.data.total_pages 
    };
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return { movies: [], totalPages: 0 };
  }
};

// Get upcoming movies
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/upcoming');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

// Get movie details by ID
export const getMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
};

// Search movies by query
export const searchMovies = async (query: string, page: number = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    if (!query.trim()) return { movies: [], totalPages: 0 };
    
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    
    return { 
      movies: response.data.results, 
      totalPages: response.data.total_pages 
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return { movies: [], totalPages: 0 };
  }
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: string, page: number = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
      },
    });
    
    return { 
      movies: response.data.results, 
      totalPages: response.data.total_pages 
    };
  } catch (error) {
    console.error(`Error fetching movies for genre ${genreId}:`, error);
    return { movies: [], totalPages: 0 };
  }
};

// Get all movie genres
export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};