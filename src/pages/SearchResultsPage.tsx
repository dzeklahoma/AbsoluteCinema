import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchMovies } from '../api/movieApi';
import { Movie } from '../types/movie';
import MovieGrid from '../components/movies/MovieGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);

  // Fetch movies based on query and page
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setMovies([]);
        setTotalPages(0);
        return;
      }
      
      try {
        setIsLoading(true);
        const { movies: results, totalPages: pages } = await searchMovies(query, currentPage);
        setMovies(results);
        setTotalPages(pages);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ q: query, page: page.toString() });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container-fluid">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Search Movies</h1>
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-full bg-white dark:bg-dark-300 border border-gray-300 dark:border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-primary py-1"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Results section */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {query && (
              <div className="mb-6">
                <h2 className="text-xl font-medium">
                  {movies.length > 0 
                    ? `Found ${movies.length} results for "${query}"`
                    : `No results found for "${query}"`
                  }
                </h2>
              </div>
            )}
            
            {movies.length > 0 ? (
              <>
                <MovieGrid movies={movies} />
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : query ? (
              <div className="py-16 text-center">
                <Search className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  We couldn't find any movies matching your search. Try different keywords or browse our categories.
                </p>
              </div>
            ) : (
              <div className="py-16 text-center">
                <h2 className="text-2xl font-bold mb-2">Search for Movies</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Type in the search box above to find your favorite movies.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;