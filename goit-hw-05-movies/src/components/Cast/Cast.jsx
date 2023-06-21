import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../services/movies-api";
import { Loader } from "../Loader/Loader";

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const getActors = await getMovieCredits(movieId);
        setCast(getActors);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActors();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      <ul>
        {cast &&
          cast.map((actor) => (
            <li key={actor.id}>
              <img
                width="200px"
                src={
                  actor.profile_path
                    ? "https://image.tmdb.org/t/p/w500" + actor.profile_path
                    : "/NoImage.svg"
                }
                alt={actor.original_name}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

