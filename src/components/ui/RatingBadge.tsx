import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

const RatingBadge = ({ rating, className = '' }: RatingBadgeProps) => {
  // Calculate color based on rating
  const getColor = () => {
    if (rating >= 7) return 'bg-success-600';
    if (rating >= 5) return 'bg-warning-600';
    return 'bg-error-600';
  };

  return (
    <div className={`flex items-center gap-1 text-white text-sm px-2 py-1 rounded-md ${getColor()} ${className}`}>
      <Star className="h-3 w-3 fill-current" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingBadge;