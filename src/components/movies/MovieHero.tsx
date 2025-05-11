import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { Movie } from '../../types/movie';
import { getImageUrl } from '../../api/movieApi';
import { Link } from 'react-router-dom';

interface MovieHeroProps {
  movie: Movie;
}

const MovieHero = ({ movie }: MovieHeroProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'Coming Soon';

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
      
      {/* Background image */}
      <img
        src={getImageUrl(movie.backdrop_path, 'original')}
        alt={`${movie.title} backdrop`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/70 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container-fluid py-12">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-3">{movie.title}</h1>
            
            <div className="flex items-center gap-4 mb-4 text-white/80">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{releaseYear}</span>
            </div>
            
            <p className="text-white/90 text-lg mb-6 line-clamp-3">{movie.overview}</p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to={`/movie/${movie.id}`}
                className="btn btn-primary flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                <span>View Details</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;