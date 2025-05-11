import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Movie } from '../types/movie';

interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  recentlyViewed: Movie[];
  addToRecentlyViewed: (movie: Movie) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<Movie[]>('favorites', []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<Movie[]>('recentlyViewed', []);

  const addToFavorites = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      // Prevent duplicates
      if (prev.some((m) => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  }, [setFavorites]);

  const removeFromFavorites = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  }, [setFavorites]);

  const isFavorite = useCallback((id: number) => {
    return favorites.some((movie) => movie.id === id);
  }, [favorites]);

  const addToRecentlyViewed = useCallback((movie: Movie) => {
    setRecentlyViewed((prev) => {
      // Remove the movie if it already exists (to re-add it at the top)
      const filtered = prev.filter((m) => m.id !== movie.id);
      // Add to the beginning of the array and maintain only the last 10 items
      return [movie, ...filtered].slice(0, 10);
    });
  }, [setRecentlyViewed]);

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        recentlyViewed,
        addToRecentlyViewed,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovie() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
}