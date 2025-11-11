import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Calendar,
  Heart,
  Play,
  Star,
  ArrowLeft,
  Ticket,
} from "lucide-react";
import { getMovieDetails, getImageUrl } from "../api/movieApi";
import { MovieDetails } from "../types/movie";
import { useMovie } from "../context/MovieContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import MovieSlider from "../components/movies/MovieSlider";

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    addToRecentlyViewed,
  } = useMovie();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const movieData = await getMovieDetails(id);

        if (movieData) {
          setMovie(movieData);

          // Add to recently viewed
          addToRecentlyViewed({
            id: movieData.id,
            title: movieData.title,
            poster_path: movieData.poster_path,
            backdrop_path: movieData.backdrop_path,
            release_date: movieData.release_date,
            vote_average: movieData.vote_average,
            overview: movieData.overview,
            genre_ids: movieData.genres.map((g) => g.id),
          });

          // Find trailer
          const trailer = movieData.videos.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );

          if (trailer) {
            setTrailerKey(trailer.key);
          }
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();

    // Scroll to top when movie ID changes
    window.scrollTo(0, 0);
  }, [id, addToRecentlyViewed]);

  const toggleFavorite = () => {
    if (!movie) return;

    const movieBasic = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      genre_ids: movie.genres.map((g) => g.id),
    };

    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movieBasic);
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!movie) {
    return (
      <div className="container-fluid py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The movie you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format release date
  const formatReleaseDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero section with backdrop */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={`${movie.title} backdrop`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/70 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link
            to="/"
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>

        {/* Play trailer button */}
        {trailerKey && (
          <button
            onClick={() => setShowTrailer(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-600/80 hover:bg-primary-600 text-white p-6 rounded-full transition-colors"
            aria-label="Play trailer"
          >
            <Play className="h-8 w-8 fill-current" />
          </button>
        )}
      </div>

      <div className="container-fluid">
        <div className="flex flex-col md:flex-row md:gap-8 -mt-32 relative z-10">
          {/* Poster */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={getImageUrl(movie.poster_path, "w500")}
                alt={`${movie.title} poster`}
                className="w-full h-auto"
              />
            </motion.div>
          </div>

          {/* Details */}
          <div className="w-full md:w-3/4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-dark-300 rounded-lg shadow-xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-2">
                {movie.genres.slice(0, 3).map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    className="text-xs font-medium px-3 py-1 bg-gray-200 dark:bg-dark-100 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                  {movie.tagline}
                </p>
              )}

              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatReleaseDate(movie.release_date)}</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </h3>
                  <p className="font-medium">{movie.status}</p>
                </div>

                {movie.budget > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Budget
                    </h3>
                    <p className="font-medium">
                      ${movie.budget.toLocaleString()}
                    </p>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">
                      Revenue
                    </h3>
                    <p className="font-medium">
                      ${movie.revenue.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                {trailerKey && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch Trailer</span>
                  </button>
                )}

                <button
                  onClick={toggleFavorite}
                  className={`btn flex items-center gap-2 ${
                    isFavorite(movie.id)
                      ? "bg-accent-600 hover:bg-accent-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-dark-100 dark:hover:bg-dark-200"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorite(movie.id) ? "fill-current" : ""
                    }`}
                  />
                  <span>
                    {isFavorite(movie.id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </span>
                </button>

                <a
                  href={`https://www.fandango.com/search?q=${encodeURIComponent(
                    movie.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-secondary-600 hover:bg-secondary-700 text-white flex items-center gap-2"
                >
                  <Ticket className="h-4 w-4" />
                  <span>Find Tickets</span>
                </a>
              </div>
            </motion.div>

            {/* Cast */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movie.credits.cast.slice(0, 10).map((person) => (
                  <div
                    key={person.id}
                    className="bg-white dark:bg-dark-300 rounded-lg shadow overflow-hidden"
                  >
                    <img
                      src={getImageUrl(person.profile_path, "w185")}
                      alt={person.name}
                      className="w-full h-auto aspect-[2/3] object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-sm">{person.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {person.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {movie.similar.results.length > 0 && (
          <div className="mt-12 pb-12">
            <MovieSlider
              title="Similar Movies"
              movies={movie.similar.results}
            />
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerKey && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            aria-label="Close trailer"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              className="w-full h-full"
              allowFullScreen
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

const X = ({ className }: { className?: string }) => (
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
    <path d="M18 6L6 18"></path>
    <path d="M6 6L18 18"></path>
  </svg>
);

export default MovieDetailsPage;
