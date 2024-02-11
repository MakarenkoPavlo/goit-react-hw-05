import { useEffect, useState } from 'react';
import { fetchTrending } from '../Components/Api/Api';
import { Link, useLocation } from 'react-router-dom';
import { Loader } from '../Components/Loader/Loader';
import { ErrorMassage } from '../Components/ErrorMassage/ErrorMassage'


export default function HomePage() {

  const [trending, setTrending] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await fetchTrending({ signal: controller.signal });
        setLoader(true);
        setTrending(data.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELLED') {
          console.log(error);
          setError(true);
        }       
      } finally {
        setLoader(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    }
  }, []);
  return (
    <div>
      {loader && <Loader />}
      {error && <ErrorMassage />}
      <h1>Trending movies today</h1>
      {trending.length > 0 && (
        <ul>
          {trending.map(trending => (
            <li key={trending.id}>
              <Link to={`/movies/${trending.id}`} state={{ from: location }}>
                <h2>{trending.title}</h2>
              </Link>        
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


