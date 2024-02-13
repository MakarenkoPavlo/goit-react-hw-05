import { useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css'

export const SearchForm = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || ''; 

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(e.target.elements.query);
    setSearchParams({ query: e.target.elements.query.value });
    e.target.reset();
  };

  return (
    <div>
      <header>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            defaultValue={queryParam} 
          />
          <button className={css.btn} type="submit">Search</button>
        </form>
      </header>
    </div>
  );
};
