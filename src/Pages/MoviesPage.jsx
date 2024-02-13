import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieSearch } from '../Components/Api/Api'
import { SearchForm } from "../Components/SearchForm/SearchForm";
import { Loader } from '../Components/Loader/Loader';
import { ErrorMassage } from '../Components/ErrorMassage/ErrorMassage';
import { Link, useLocation } from 'react-router-dom';

export default function MoviesPage() {
   const [query, setQuery] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchMovie = async query => {
      setQuery(query.value);
    setSearchParams({ query: query.value }); 
  };
  
useEffect(() => {
  const fetchSearchMovies = async () => {
      const query = searchParams.get('query');
      if (!query) return;
      try {
        setLoader(true);
        const fetchedSearch = await fetchMovieSearch(query);
        setSearchMovies(fetchedSearch.results)
      } catch (error) {
        if (error.code !== 'ERR_CANCELLED') {
          console.log(error);
        setError(true);
      }
      } finally {
        setLoader(false);
      }
 
    }
      fetchSearchMovies();
    }, [query, searchParams]);

  return (
    <div>
      <SearchForm onSearch={searchMovie} />
      {loader && <Loader />}
      {error && <ErrorMassage />}
      {searchMovies.length > 0 && (
         <ul>
          {searchMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                <h2>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
        )}
    </div>
    )
  
}