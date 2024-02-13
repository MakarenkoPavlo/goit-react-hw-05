import { fetchMovieCast } from '../Api/Api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { ErrorMassage } from '../ErrorMassage/ErrorMassage';
import css from './MovieCast.module.css';

const MovieCast = () => {
    const { movieId } = useParams();
    const [movieCastDetails, setMovieCastDetails] = useState([]); 
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCastDetails = async () => {
            try {
                setLoader(true);
                const fetchedCast = await fetchMovieCast(movieId);
                if (fetchedCast && fetchedCast.cast) {
                    setMovieCastDetails(fetchedCast.cast);
                } else {
                    setMovieCastDetails([]);
                }
            } catch (error) {
                if (error.code !== 'ERR_CANCELLED') {
                    console.log(error);
                    setError(true);
                }
            } finally {
                setLoader(false);
            }
        };

        fetchCastDetails();
    }, [movieId]);

    return (
        <div>
            {loader && <Loader />}
            {error && <ErrorMassage />}
            {!loader && !error && movieCastDetails.length === 0 && (
                <p>No cast details available.</p>
            )}
            {movieCastDetails && movieCastDetails.length > 0 && (
                <div className={css.container}>
                    <ul className={css.list}>
                        {movieCastDetails.map(actor => (
                            <li key={actor.id} className={css.item}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                    alt={actor.name}
                                    className={css.img}
                                />
                                <h4>{actor.name}</h4>
                                <p>Character {actor.character}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MovieCast;
