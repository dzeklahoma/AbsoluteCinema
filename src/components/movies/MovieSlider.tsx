import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../../types/movie';
import MovieCard from './MovieCard';

interface MovieSliderProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

const MovieSlider = ({ title, movies, viewAllLink }: MovieSliderProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = 320; // Approximate width of one card + gap
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    let newPosition;
    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }
    
    slider.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        
        {viewAllLink && (
          <a 
            href={viewAllLink}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 font-medium"
          >
            View All
          </a>
        )}
      </div>
      
      <div className="relative group">
        {/* Left control */}
        {scrollPosition > 0 && (
          <button
            className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-dark-200/80 rounded-full p-2 shadow-md opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        
        {/* Right control */}
        <button
          className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-dark-200/80 rounded-full p-2 shadow-md opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Slider */}
        <div 
          ref={sliderRef}
          className="overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <motion.div 
            className="flex gap-6"
            initial={{ x: 0 }}
            style={{ minWidth: 'max-content' }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="w-[250px] flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;