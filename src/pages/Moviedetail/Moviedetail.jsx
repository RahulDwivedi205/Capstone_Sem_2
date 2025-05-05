import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  };

  return (
    <div className="movie">
      {/* Intro Backdrop */}
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.backdrop_path || ""}`}
          alt="movie backdrop"
        />
      </div>

      {/* Movie Details */}
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.poster_path || ""}`}
              alt="movie poster"
            />
          </div>
        </div>

        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail?.original_title}</div>
            <div className="movie__tagline">{currentMovieDetail?.tagline}</div>

            <div className="movie__rating">
              {currentMovieDetail?.vote_average} <i className="fas fa-star" />
              <span className="movie__voteCount">
                ({currentMovieDetail?.vote_count} votes)
              </span>
            </div>

            <div className="movie__runtime">
              {currentMovieDetail?.runtime} mins
            </div>

            <div className="movie__releaseDate">
              Release date: {currentMovieDetail?.release_date}
            </div>

            <div className="movie__genres">
              {currentMovieDetail?.genres?.map((genre) => (
                <span className="movie__genre" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail?.overview}</div>
          </div>
        </div>
      </div>

      {/* Useful Links */}
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>

        {currentMovieDetail?.homepage && (
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}

        {currentMovieDetail?.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>

      {/* Production Companies */}
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail?.production_companies?.map(
          (company) =>
            company.logo_path && (
              <span className="productionCompanyImage" key={company.id}>
                <img
                  className="movie__productionComapany"
                  src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                  alt={company.name}
                />
                <span>{company.name}</span>
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default Movie;
