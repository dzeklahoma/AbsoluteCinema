import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Movie } from '../../types/movie';
import { getImageUrl } from '../../api/movieApi';
import { useMovie } from '../../context/MovieContext';
import RatingBadge from '../ui/RatingBadge';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovie();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'TBA';

  return (
    <motion.div 
      className="card-hover group h-full"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <div className="relative rounded-lg overflow-hidden h-full flex flex-col bg-white dark:bg-dark-300 shadow-md">
          <div className="relative aspect-[2/3] overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-dark-100 animate-pulse" />
            )}
            
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={`${movie.title} poster`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <RatingBadge rating={movie.vote_average} className="absolute top-2 left-2" />
            
            <button
              onClick={toggleFavorite}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                favorite 
                  ? 'bg-accent-500 text-white' 
                  : 'bg-black/50 text-white hover:bg-accent-500'
              } transition-colors duration-300`}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="p-4 flex-grow flex flex-col justify-between">
            <h3 className="font-medium text-base md:text-lg line-clamp-2">{movie.title}</h3>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{releaseYear}</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;