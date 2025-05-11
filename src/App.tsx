import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy-loaded pages for better initial loading performance
const HomePage = lazy(() => import('./pages/HomePage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const GenrePage = lazy(() => import('./pages/GenrePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;