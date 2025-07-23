import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movielist/Movielist";
import Header from "../../components/header/Header";


const Home = ({token, setToken}) => {
  const [popularMovies, setPopularMovies] = useState([]);
  console.log("ye hai token", token)
  useEffect(() => {
    fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);
  console.log(popularMovies)

  if (token){return (
   
    <div className="poster">
      <Header setToken = {setToken}/>
      <Carousel
        showThumbs={false}
        autoPlay
        transitionTime={3}
        infiniteLoop
        showStatus={false}
      >
        {popularMovies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={`${movie.original_title} Poster`}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">
                {movie.original_title}
              </div>
              <div className="posterImage__runtime">
                {movie.release_date}
                <span className="posterImage__rating">
                  {movie.vote_average}
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="posterImage__description">
                {movie.overview}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>

      <MovieList />
    </div>
  )}
  else{
    return (
      <h1>Please login first</h1>
    )
  }
  
};

export default Home;
