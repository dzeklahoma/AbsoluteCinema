import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Search, Heart, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getGenres } from "../../api/movieApi";
import { Genre } from "../../types/movie";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Load genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      const genreList = await getGenres();
      setGenres(genreList);
    };

    fetchGenres();
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-dark-200/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-fluid py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold">AbsoluteCinema</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative">
              <button
                onClick={() => setShowGenres(!showGenres)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              >
                Genres
              </button>

              {showGenres && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-dark-100 rounded-lg shadow-lg py-2 grid grid-cols-2 gap-1"
                  onMouseLeave={() => setShowGenres(false)}
                >
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.id}`}
                      className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-300"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            <Link
              to="/favorites"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors flex items-center gap-1"
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </Link>

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 pl-10 pr-4 w-60 rounded-full bg-gray-100 dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/search">
              <Search className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-dark-200 shadow-lg"
        >
          <div className="container-fluid py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-lg"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowGenres(!showGenres)}
                className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-lg flex items-center justify-between"
              >
                <span>Genres</span>
              </button>

              {showGenres && (
                <div className="pl-4 mt-2 grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.id}`}
                      className="py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-dark-300 rounded-lg"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/favorites"
              className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-lg flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </Link>
            <div className="flex items-center justify-between py-2 px-4">
              <span>Theme</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-300"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
