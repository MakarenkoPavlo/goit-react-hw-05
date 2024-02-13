import { useEffect, useState } from 'react';
import { fetchMovieSearch } from '../Components/Api/Api'
import { SearchForm } from "../Components/SearchForm/SearchForm";
import { Loader } from '../Components/Loader/Loader';
import { ErrorMassage } from '../Components/ErrorMassage/ErrorMassage';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
   const [query, setQuery] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? '';
  const location = useLocation();

 
  
useEffect(() => {
  const fetchSearchMovies = async () => {
      if (!query) return;
      try {
        setLoader(true);
        const fetchedSearch = await fetchMovieSearch(query);
        setSearchMovies(fetchedSearch.results)
        const nextParams = query !== '' ? { query } : {};
        setSearchParams(nextParams);
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
}, [query, setSearchParams]);
  
   const searchMovie = async query => {
  setQuery(query);
  };

  return (
    <div>
      <SearchForm value={movieName} onSearch={searchMovie} />
      {loader && <Loader />}
      {error && <ErrorMassage />}
      {searchMovies.length > 0 && (
         <ul>
          {searchMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location, query: searchParams.get('query') }}>
                <h2>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
        )}
    </div>
    )
  
}

