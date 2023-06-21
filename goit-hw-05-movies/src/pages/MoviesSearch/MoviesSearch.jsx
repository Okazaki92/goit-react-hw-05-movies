import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getQueryMovies } from "../../services/movies-api";
import { MoviesList } from "../../components/MoviesList/MoviesList";
import { Loader } from "../../components/Loader/Loader";

export const MoviesSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      const onSearchMovie = async () => {
        setLoading(true);
        try {
          const searchMovie = await getQueryMovies(query);
          setMovies(searchMovie);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      onSearchMovie();
    }
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: event.target.elements.query.value.toLowerCase() });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" autoFocus />
        <button type="submit">Search</button>
      </form>
      {movies && <MoviesList movies={movies} />}
      {loading && <Loader />}
    </>
  );
};
