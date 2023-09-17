import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../component/index";
import {
  calender,
  des,
  home,
  logo,
  tvshow,
  projector,
  Logout,
} from "../../assets/index";
import { BiArrowBack } from "react-icons/bi";
import { createUseStyles } from "react-jss";
import { Toaster, toast } from "react-hot-toast";
import YouTube from "react-youtube";

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
    border: "1px solid #000000",
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

  navQ: {
    width: "170px",
    border: "1px solid #BE123C",
    height: "210px",
    marginLeft: "2rem",
    borderRadius: "20px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
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

  btn: {
    width: "112px",
    border: "1px solid",
    borderRadius: "30px",
    color: "#BE123C",
    marginTop: "50px",
  },

  castLists: {
    color: "#BE123C",
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
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
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
    // Fetch director(s) information
    axios
      .get(`${baseUrl}/${movie_id}/credits?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        // Extract director(s) from the response
        const directors = response.data.crew.filter(
          (crewMember) => crewMember.job === "Director"
        );

        setDirectors(directors);
      })
      .catch((error) => {
        console.error("Error fetching director(s) information:", error);
      });

    // Fetch writer(s) information
    axios
      .get(`${baseUrl}/${movie_id}/credits?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        // Extract writer(s) from the response
        const writers = response.data.crew.filter(
          (crewMember) => crewMember.department === "Writing"
        );

        setWriters(writers);
      })
      .catch((error) => {
        console.error("Error fetching writer(s) information:", error);
      });
    axios
      .get(`${baseUrl}/${movie_id}/credits?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        // Extract cast from the response
        const cast = response.data.cast;

        setCast(cast);
      })
      .catch((error) => {
        console.error("Error fetching cast information:", error);
      });

    // Fetch trailer information
    axios
      .get(`${baseUrl}/${movie_id}/videos?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        // Find the first trailer with the type 'Trailer' (other types include 'Teaser', 'Featurette', etc.)
        const trailer = response.data.results.find(
          (video) => video.type === "Trailer"
        );

        // Set the trailer key if a trailer is found
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((error) => {
        console.error("Error fetching trailer information:", error);
      });
  }, [movie_id, apiKey]);

  // useEffect(() => {
  //   // Fetch movie details
  //   axios

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
              <img src={projector} alt="logo" />
              <span>Movies</span>
            </p>
            <p className={classes.navP}>
              <img src={tvshow} alt="logo" />
              <span>TV Series</span>
            </p>

            <p className={classes.navP}>
              <img src={calender} alt="logo" />
              <span>Upcoming</span>
            </p>
            <div className={classes.navQ}>
              <h3>play movie quizes and earn free tickets</h3>
              <h6>50k people are playing now</h6>
              <span className={classes.btn}>Start playing</span>
            </div>

            <p className={classes.navP}>
              <img src={Logout} alt="logo" />
              <span>Logout</span>
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
              <YouTube
                videoId={trailerKey} // Replace with your trailerKey fetched from TMDb
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 0,
                  },
                }}
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

            <div className={classes.director}>
              <p>
                <strong>Director(s):</strong>{" "}
                <span className={classes.castLists}>
                  {directors.map((director) => director.name).join(", ")}
                </span>
              </p>
            </div>
            <div className={classes.writers}>
              <p>
                <strong>Writer(s):</strong>{" "}
                <span className={classes.castLists}>
                  {writers.map((writer) => writer.name).join(", ")}
                </span>
              </p>
            </div>
            <div className={classes.cast}>
              <p>
                <strong>Cast:</strong>
                <span className={classes.castLists}>
                  {cast.map((actor) => actor.name).join(", ")}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
