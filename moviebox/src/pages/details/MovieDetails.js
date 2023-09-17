import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../component/index";
import { calender, des, home, logo, tvshow } from "../../assets/index";
import { BiArrowBack } from "react-icons/bi";
import { createUseStyles } from "react-jss";
import { Toaster, toast } from "react-hot-toast";

const useStyles = createUseStyles((theme) => ({
  details: {
    width: "80%",
    margin: "0 auto",
    fontFamily: "Courier New, Courier, monospace",
  },

  detailsContainer: {
    display: "flex",
    justifyContent: "space-around",
  },

  menuWrapper: {
    padding: ".2rem",
    display: "flex",
    gap: "2rem",
    zIndex: "1000",
    fontSize: "26px",
    cursor: "pointer",
    position: "fixed",
    top: "-.6rem",
    width: "100%",
    backgroundColor: "#fff",
  },

  nav: {
    width: "20%",
    border: "1px solid #428bca",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
  },

  navP: {
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
    margin: "2.5rem 0",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    padding: ".5rem 0",
    cursor: "pointer",
  },

  main: {
    width: "70%",
  },

  homeLink: {
    display: "none",
    textAlign: "end",
    color: "#428bca",
    fontSize: "20px",
  },

  link: {
    color: "#428bca",
    fontSize: "20px",
    textDecoration: "none",
  },

  imgContainer: {
    width: "100%",
  },
  img: {
    width: "100%",
    borderRius: "20px",
  },
  dateDes: {
    display: "flex",
    gap: "5rem",
  },

  overView: {
    display: "flex",
    gap: "1rem",
  },

  saveMovieBtn: {
    padding: "0 .5rem",
    backgroundColor: theme.colors.blue,
    color: "#fff",
    border: `1px solid ${theme.colors.blue}`,
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "12px",
  },

  savedMovieBtn: {
    padding: "0 .5rem",
    backgroundColor: "black",
    color: "white",
    border: "1px solid black",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "12px",
  },

  "@media (max-width: 900px)": {
    details: {
      width: "100%",
    },
    nav: {
      display: "none",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: ".5rem",
    },
    overView: {
      flexDirection: "column",
    },
  },
}));

const MovieDetails = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const baseUrl = "https://api.themoviedb.org/3/movie";
  const classes = useStyles();

  const [isMovieSaved, setIsMovieSaved] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/${movie_id}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      });
  }, [movie_id, apiKey]);

  const navigator = useNavigate();
  const toHomePage = () => {
    navigator("/");
  };

  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const handleSaveMovie = () => {
    if (!isMovieSaved) {
      setIsMovieSaved(true);

      toast("Movie Saved Successfully", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "#333",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <div className={classes.details}>
      <Toaster />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className={classes.detailsContainer}>
          <div className={classes.nav}>
            <p className={classes.navP}>
              <img src={logo} alt="logo" />
            </p>
            <p onClick={toHomePage} className={classes.navP}>
              <img src={home} alt="logo" />
              <span>Home</span>
            </p>
            <p className={classes.navP}>
              <img src={tvshow} alt="logo" />
              <span>TV Series</span>
            </p>
            <p className={classes.navP}>
              <img src={calender} alt="logo" />
              <span>Upcoming</span>
            </p>
          </div>
          <div className={classes.main}>
            <p className={classes.homeLink}>
              <BiArrowBack />
              <Link to="/" className={classes.link}>
                Back
              </Link>
            </p>
            <h1 data-testid="movie-title">{movie.title}</h1>
            <div className={classes.imgContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                alt={`${movie.title} poster`}
                className={classes.img}
                data-testid="movie-poster"
              />
            </div>
            <div>
              <div className={classes.dateDes}>
                <p data-testid="movie-release-date">{movie.release_date}</p>
                <p data-testid="movie-runtime">
                  {convertMinutesToHours(movie.runtime)}
                </p>
                <button
                  onClick={handleSaveMovie}
                  className={
                    isMovieSaved ? classes.savedMovieBtn : classes.saveMovieBtn
                  }
                  disabled={isMovieSaved}
                >
                  {isMovieSaved ? "Movie Saved" : "Save Movie"}
                </button>
              </div>
              <div className={classes.overView}>
                <p>{movie.overview}</p>
                <img src={des} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
