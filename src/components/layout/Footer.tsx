import { Link } from "react-router-dom";
import { Film, Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-dark-300 pt-12 pb-8">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Film className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-bold">AbsoluteCinema</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your ultimate movie destination. Discover, explore, and save your
              favorite films all in one place.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors text-sm"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors text-sm"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-100 pt-8 mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB. All movie data and images are provided by The Movie Database
            (TMDb).
          </p>
          <p className="mt-2">
            &copy; {currentYear} CineVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
