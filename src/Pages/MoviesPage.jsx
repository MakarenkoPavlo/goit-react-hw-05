import { SearchForm } from "../Components/SearchForm/SearchForm";

export default function MoviesPage() {

 const searchMovies = query => {
    console.log(query.value);
  };
  
  return(<SearchForm onSearch={searchMovies} />)
  
}

