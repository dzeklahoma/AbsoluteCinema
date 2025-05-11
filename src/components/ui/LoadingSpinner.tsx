import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  small?: boolean;
}

const LoadingSpinner = ({ fullScreen, small }: LoadingSpinnerProps) => {
  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className={`border-t-4 border-primary-600 rounded-full ${
        small ? 'h-6 w-6' : 'h-12 w-12'
      }`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;