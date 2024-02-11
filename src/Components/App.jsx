import { Routes, Route} from 'react-router-dom';
import HomePage from '../Pages/HomePage.jsx'
import MovieDetailsPage from '../Pages/MovieDetailsPage.jsx'
import MoviesPage from '../Pages/MoviesPage.jsx'
import NotFoundPage from '../Pages/NotFoundPage.jsx'
import { Navbar } from './Navbar/Navbar.jsx'




export const App = () => {
  

  return (
    <div>
      <Navbar />
    <div>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App
