import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state
  const { type } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);     // start loading
        setError(null);       // clear previous errors

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setMovieList(data.results);
      } catch (error) {
        console.error("Error fetching movie list:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false); // done loading
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type || "Popular").toUpperCase()}</h2>

      {loading && <p>Loading movies...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="list__cards">
          {movieList.map((movie) => (
            <Cards key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;

