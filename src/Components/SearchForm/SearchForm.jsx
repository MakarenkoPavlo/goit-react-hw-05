import css from './SearchForm.module.css'
export const SearchForm = ({ onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();
        onSearch(e.target.elements.query);
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
          />
          <button className={css.btn} type="submit">Search
          </button>
        </form>
      </header>
    </div>
  );
};