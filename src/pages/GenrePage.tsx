import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByGenre, getGenres } from '../api/movieApi';
import { Movie, Genre } from '../types/movie';
import MovieGrid from '../components/movies/MovieGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';

const GenrePage = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<Genre | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    const fetchGenreName = async () => {
      if (!id) return;
      
      const genres = await getGenres();
      const genreInfo = genres.find(g => g.id.toString() === id);
      
      if (genreInfo) {
        setGenre(genreInfo);
      }
    };
    
    fetchGenreName();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        const { movies: results, totalPages: pages } = await getMoviesByGenre(id, currentPage);
        setMovies(results);
        setTotalPages(pages);
      } catch (error) {
        console.error('Error fetching genre movies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
    window.scrollTo(0, 0);
  }, [id, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container-fluid">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {genre ? genre.name : 'Genre'} Movies
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Discover the best {genre?.name} movies.
        </p>
        
        {movies.length > 0 ? (
          <>
            <MovieGrid movies={movies} />
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold mb-2">No Movies Found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We couldn't find any movies in this genre. Please try another genre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;