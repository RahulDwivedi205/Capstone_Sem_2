import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery) {
      window.location.href = `/search/${searchQuery}`;
    }
  };

  return (
    <header className="header">
      <div className="headerLeft">
        <Link to="/">
          <img src="imdb.png" alt="IMDb Logo" className="header__icon" />
        </Link>
        <Link to="/movies/popular" className="header__link">Popular</Link>
        <Link to="/movies/top_rated" className="header__link">Top Rated</Link>
        <Link to="/movies/upcoming" className="header__link">Upcoming</Link>
      </div>

      <div className="headerRight">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchInput"
        />
        <button onClick={handleSearch} className="searchButton">Search</button>
      </div>
    </header>
  );
};

export default Header;
