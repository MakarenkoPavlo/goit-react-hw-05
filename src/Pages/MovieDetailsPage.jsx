import { useEffect, useState, useRef } from 'react';
import { Suspense } from 'react';

import { useParams, Link, Outlet, useLocation} from 'react-router-dom';
import { fetchMovieDetails } from '../Components/Api/Api'
import { Loader } from '../Components/Loader/Loader';
import { ErrorMassage } from '../Components/ErrorMassage/ErrorMassage';
import { BackToLink } from '../Components/BackToLink/BackToLink';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/movies');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoader(true);
        const fetchedMovies = await fetchMovieDetails(movieId);
        setMovieDetails(fetchedMovies)
      } catch (error) {
        if (error.code !== 'ERR_CANCELLED') {
          console.log(error);
          setError(true);
        }
      } finally {
        setLoader(false);
      }
    }
    fetchDetails();
  }, [movieId]);

  return (
    <div>
      <BackToLink to={backLinkHref.current}>GO BACK</BackToLink>
      {loader && <Loader />}
      {error && <ErrorMassage />}
      {movieDetails &&
        <div >
          <div className={css.container}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                height={350}
                width={250}
              />
            </div>
            <div>
              <h2 className={css.title}>{movieDetails.title}</h2>
              <div className={css.title}>
                <h3>User Score</h3>
                <p>{movieDetails.vote_average}</p>
              </div>
              <div className={css.title}>
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
              </div>
              <h3>Genres</h3>
              {movieDetails.genres && (
                <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
              )}
            </div>
          </div>
          <div className={css.information}>
            <h3 className={css.item}>Additional information</h3>
            <ul className={css.list}>
              <li className={css.item}>
                <Link className={css.link} to={`cast`}>Cast</Link>
              </li>
              <li>
                <Link className={css.link} to={`reviews`}>Reviews</Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading subpage...</div>}>
              <Outlet />
           </Suspense>
        
        </div>}
    </div>
  );
}
