import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import MovieGrid from '../components/movies/MovieGrid';
import { useMovie } from '../context/MovieContext';

const FavoritesPage = () => {
  const { favorites, recentlyViewed } = useMovie();
  const [activeTab, setActiveTab] = useState<'favorites' | 'recent'>('favorites');

  const handleTabChange = (tab: 'favorites' | 'recent') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">My Collection</h1>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-dark-100 mb-8">
            <button
              className={`py-3 px-6 font-medium relative ${
                activeTab === 'favorites'
                  ? 'text-primary-600 dark:text-primary-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => handleTabChange('favorites')}
            >
              <div className="flex items-center gap-2">
                <Heart className={`h-4 w-4 ${activeTab === 'favorites' ? 'fill-current' : ''}`} />
                <span>Favorites</span>
                <span className="bg-gray-200 dark:bg-dark-100 rounded-full px-2 py-0.5 text-xs ml-1">
                  {favorites.length}
                </span>
              </div>
              
              {activeTab === 'favorites' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-500" 
                />
              )}
            </button>
            
            <button
              className={`py-3 px-6 font-medium relative ${
                activeTab === 'recent'
                  ? 'text-primary-600 dark:text-primary-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => handleTabChange('recent')}
            >
              <div className="flex items-center gap-2">
                <span>Recently Viewed</span>
                <span className="bg-gray-200 dark:bg-dark-100 rounded-full px-2 py-0.5 text-xs ml-1">
                  {recentlyViewed.length}
                </span>
              </div>
              
              {activeTab === 'recent' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-500" 
                />
              )}
            </button>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'favorites' && (
            favorites.length === 0 ? (
              <div className="py-16 text-center">
                <Heart className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Start exploring movies and add them to your favorites by clicking the heart icon on any movie card.
                </p>
              </div>
            ) : (
              <MovieGrid movies={favorites} />
            )
          )}
          
          {activeTab === 'recent' && (
            recentlyViewed.length === 0 ? (
              <div className="py-16 text-center">
                <Clock className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Recently Viewed Movies</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Movies you view will appear here so you can easily find them again.
                </p>
              </div>
            ) : (
              <MovieGrid movies={recentlyViewed} />
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Clock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default FavoritesPage;