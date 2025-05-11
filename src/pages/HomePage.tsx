import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies,
  getUpcomingMovies
} from '../api/movieApi';
import { Movie } from '../types/movie';
import MovieHero from '../components/movies/MovieHero';
import MovieSlider from '../components/movies/MovieSlider';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [trending, popular, topRated, upcoming] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies()
        ]);
        
        setTrendingMovies(trending);
        setPopularMovies(popular.movies);
        setTopRatedMovies(topRated.movies);
        setUpcomingMovies(upcoming);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="container-fluid py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  // Select a random trending movie for the hero section
  const featuredMovie = trendingMovies.length > 0 
    ? trendingMovies[Math.floor(Math.random() * Math.min(5, trendingMovies.length))] 
    : null;

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      {featuredMovie && <MovieHero movie={featuredMovie} />}
      
      <div className="container-fluid py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Trending Movies */}
          <MovieSlider 
            title="Trending Now" 
            movies={trendingMovies} 
            viewAllLink="/trending"
          />
          
          {/* Popular Movies */}
          <MovieSlider 
            title="Popular Movies" 
            movies={popularMovies} 
            viewAllLink="/popular"
          />
          
          {/* Top Rated Movies */}
          <MovieSlider 
            title="Top Rated" 
            movies={topRatedMovies} 
            viewAllLink="/top-rated"
          />
          
          {/* Upcoming Movies */}
          <MovieSlider 
            title="Coming Soon" 
            movies={upcomingMovies} 
            viewAllLink="/upcoming"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;