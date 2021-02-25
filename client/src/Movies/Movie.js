import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  // Update Card
  const handleUpdate = () => {
    history.push(`/movieUpdate/${params.id}`)
  }

  // Delete Card
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(() => {
        history.goBack()
      })
      .catch((err) => console.log({err}))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" onClick={handleUpdate}>
        Edit
      </div>
      <div className="delete-button" onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
