import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { fetchMovieDetails } from '../Components/Api/Api'
import { Loader } from '../Components/Loader/Loader';
import { ErrorMassage } from '../Components/ErrorMassage/ErrorMassage';
import { BackToLink } from '../Components/BackToLink/BackToLink';



export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
   const backLinkHref = location.state?.from ?? '/';


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
        <BackToLink to={backLinkHref}>GO BACK</BackToLink>
       {loader && <Loader />}
      {error && <ErrorMassage />}
      <h1>MovieDetailsPage</h1>
      {movieDetails &&
        <div>
           <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              height={350}
              width={250}
            />
          </div>
          <div>
            <h2>{movieDetails.title}</h2>
            <h3>User Score</h3>
            <p>{movieDetails.vote_average}</p>

            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>

            <h3>Genres</h3>
            {movieDetails.genres && (
              <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
            )}
          </div>
        </div>}
    </div>
  );
}