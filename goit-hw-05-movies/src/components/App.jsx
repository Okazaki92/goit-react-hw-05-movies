import { Route, Routes } from "react-router-dom";
import { Navigation } from "./Navigation/Navigation";
import { Home } from "../pages/Home/Home";
import { MoviesSearch } from "../pages/MoviesSearch/MoviesSearch";
import { MovieDetails } from "../pages/MovieDetails/MovieDetails";
import { Cast } from "./Cast/Cast";
import { Reviews } from "./Reviews/Reviews";

export const App = () => {
  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesSearch />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
};
