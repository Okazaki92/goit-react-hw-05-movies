import { useState, useEffect } from "react";
import { useLocation, Link, useParams, Outlet } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Loader } from "../../components/Loader/Loader";
import { getMovieDetails } from "../../services/movies-api";
import styles from "./MovieDetails.module.css";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        const details = await getMovieDetails(movieId);
        setMovieInfo(details);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [movieId]);

  return (
    <>
      <Link to={backLinkHref}>
        <button type="button">
          <BsSearch />
          Go back
        </button>
      </Link>
      {loading && <Loader />}
      {movieInfo && (
        <div className={styles.movieDetails}>
          <img
            src={"https://image.tmdb.org/t/p/w500" + movieInfo.poster_path}
            alt={movieInfo.original_title}
            width="300px"
          />
          <div>
            <h1>{movieInfo.title}</h1>
            <p>User score: {(movieInfo.vote_average * 10).toFixed(2)}%</p>
            <h2>Overview</h2>
            <p>{`${movieInfo.overview}`}</p>
            <h2>Genres</h2>
            <ul>
              {movieInfo.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <hr />
        <Outlet />
      </div>
    </>
  );
};
