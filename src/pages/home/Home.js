import axios from "axios";
import { useEffect, useState } from "react";
import { Loader, MovieCard } from "../../component/index";
import {
  footer,
  Moviebox,
  trailer,
  menu,
  imdb,
  fruith,
} from "../../assets/index";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

import "./home.scss";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = process.env.REACT_APP_TMDB_KEY;

  const baseUrl = "https://api.themoviedb.org/3/movie/top_rated";
  const allMovieUrl = "https://api.themoviedb.org/3/search/movie";

  console.log("popularMovies", popularMovies);

  useEffect(() => {
    axios
      .get(`${baseUrl}?api_key=${API_KEY}`)
      .then((response) => {
        const sortedMovies = response.data.results.slice(0, 10);

        setTopMovies(sortedMovies);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error fetching top movies:", error);
        setIsLoading(false);
      });
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, [API_KEY]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    if (searchTerm) {
      setSearchLoading(true);
      axios
        .get(`${allMovieUrl}?api_key=${API_KEY}&query=${searchTerm}`)
        .then((response) => {
          const searchResults = response.data.results;

          const filteredResults = searchResults.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setTimeout(() => {
            setSearchLoading(false);
          }, 3000);

          setSearchedMovies(filteredResults);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setSearchLoading(false);
        });
    } else {
      setSearchedMovies([]);
      setSearchLoading(false);
    }
  };

  const navigator = useNavigate();
  const handleMovieDetails = (movie_id) => {
    navigator(`movies/${movie_id}`);
  };

  return (
    <div className="home">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <div className="top-bg">
            <div className="header-des">
              <div className="header-skeleton">
                <div className="moviebox-header">
                  <img className="moviebox-img" src={Moviebox} alt="menu" />
                  <h1>MovieBox</h1>
                </div>
                <div className="input-fild">
                  <input
                    type="text"
                    placeholder="Search by movie title"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="inputs"
                  />
                </div>
                <div className="header-menu ">
                  <p>sign in</p>
                  <img className="menu-img" src={menu} alt="menu" />
                </div>
              </div>

              <div>
                <h3>John wick 3:</h3>
                <h3>Parabellum</h3>
                <div className="header-rating">
                  <div className="img-skeleton">
                    <span className="imdb-img">
                      <img src={imdb} alt="menu" />
                    </span>

                    <p>86.0/100</p>
                  </div>

                  <div className="img-skeleton">
                    <span className="fruit-img">
                      <img src={fruith} alt="menu" />
                    </span>
                    <p>97%</p>
                  </div>
                </div>

                <h3>
                  John Wick is on the run after killing a member of the
                  international assassins' guild, and with a $14 million price
                  tag on his head, he is the target of hit men and women
                  everywhere.
                </h3>

                <div className="trailers">
                  <img src={trailer} alt="menu" />
                  <h3>Watch Trailer</h3>
                </div>
              </div>
            </div>

            {/* <div className="input-fild">
              <input
                type="text"
                placeholder="Search by movie title"
                value={searchTerm}
                onChange={handleSearch}
                className="inputs"
              />
            </div> */}
          </div>
          <div className="featured-movie">
            <h1 className="title">Featured Movies</h1>
            <p className="see-more">
              <span>see more</span>
              <span>
                <AiOutlineArrowRight />
              </span>
            </p>
          </div>
          <div className="movie-wrapper">
            {topMovies.map((movie) => (
              <div key={movie.id} className="movies-container">
                <MovieCard
                  data-testid="movie-card"
                  movie_id={movie.id}
                  poster={movie.backdrop_path}
                  posterTitle={movie.backdrop_path}
                  popularity={movie.popularity}
                  title={movie.title}
                  releaseDate={movie.release_date}
                />
              </div>
            ))}
          </div>
          {searchLoading ? (
            <h1 className="loading">Loading...</h1>
          ) : (
            searchTerm && (
              <div className="search-movies-container">
                <div>
                  {searchedMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="search-des"
                      onClick={() => handleMovieDetails(movie.id)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`}
                        alt={`${movie.title.slice(0, 10)} poster`}
                      />
                      <div className="titleAndDate">
                        <h3>{movie.title.slice(0, 25)}</h3>
                        <p>{movie.release_date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
          <div className="footer">
            <div className="des-section">
              <img src={footer} alt="footer" />
              <p>
                <span>Condition of Use</span>
                <span>Privacy & Policy</span>
                <span>Press Room</span>
              </p>
              <p>&copy; 2023 MovieBox By Willz</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
