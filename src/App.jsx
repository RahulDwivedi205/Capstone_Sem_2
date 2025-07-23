import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Movie from './pages/Moviedetail/Moviedetail';
import MovieList from './components/movielist/Movielist';
import LoginSignup from './components/login/login';

function App() {
  return (
    <div className="App">
      <Router>
        
       
        <Routes>
          <Route path="" element={<LoginSignup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/movies/:type" element={<MovieList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
