import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-24 flex items-center">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;