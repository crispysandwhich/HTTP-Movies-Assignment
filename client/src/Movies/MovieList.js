import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  const history = useHistory()

  const handleNew = () => {
    
    history.push('/add-movie')

    console.log('test')
  }

  return (
    <div className="movie-list">
      <button onClick={handleNew}>test</button>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
