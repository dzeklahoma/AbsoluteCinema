import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Create array of page numbers to show
  const getPageNumbers = () => {
    const range = 2; // How many pages to show on each side of current page
    
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);
    
    // Adjust if we're near the start or end
    if (currentPage <= range) {
      end = Math.min(1 + range * 2, totalPages);
    } else if (currentPage >= totalPages - range) {
      start = Math.max(totalPages - range * 2, 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-8 space-x-1">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-dark-300"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {/* First page */}
      {getPageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-10 h-10 rounded-md ${
              currentPage === 1 ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-dark-300'
            }`}
          >
            1
          </button>
          
          {getPageNumbers()[0] > 2 && (
            <span className="px-2">...</span>
          )}
        </>
      )}
      
      {/* Page numbers */}
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-md ${
            currentPage === page ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-dark-300'
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Last page */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-md ${
              currentPage === totalPages ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-dark-300'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}
      
      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-dark-300"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;