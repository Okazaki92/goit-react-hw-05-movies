import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/movies-api";
import { MoviesList } from "../../components/MoviesList/MoviesList";
import { Loader } from "../../components/Loader/Loader";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      <MoviesList movies={movies} />
      {loading && <Loader />}
    </main>
  );
};
