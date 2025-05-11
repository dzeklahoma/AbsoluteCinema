import { motion } from 'framer-motion';
import { Movie } from '../../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

const MovieGrid = ({ movies, title }: MovieGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  if (movies.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{title || 'Movies'}</h2>
        <p className="text-gray-600 dark:text-gray-400">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.div>
    </div>
  );
};

export default MovieGrid;