import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Navbar } from './Navbar/Navbar.jsx';

const HomePage = lazy(() => import('../Pages/HomePage.jsx'));
const MovieDetailsPage = lazy(() => import('../Pages/MovieDetailsPage.jsx'));
const MoviesPage = lazy(() => import('../Pages/MoviesPage.jsx'));
const NotFoundPage = lazy(() => import('../Pages/NotFoundPage.jsx'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews.jsx'));

export const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Navbar />
      
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
    
      </Suspense>
    </div>
  );
}

