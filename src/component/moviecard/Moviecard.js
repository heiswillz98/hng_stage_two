import React from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { fruith, imdb } from "../../assets/index";

const useStyles = createUseStyles((theme) => {
  console.log(theme, "theme");
  return {
    movieCard: {
      width: "100%",
      margin: "1rem",
      color: theme.colors.blue,
      borderRadius: "10px",
    },

    movieCardImg: {
      cursor: "pointer",
      height: "250px",
      width: "320px",
    },

    desContainer: {
      display: "flex",
      justifyContent: "space-between",
    },

    details: {
      display: "flex",
      flexDirection: "column",
      width: "70%",
      padding: "0 .5rem",
    },
    detailsSpan: {
      // color: theme.colors.blue,
      color: "black",
      fontSize: "14px",
    },
    detalsH3: {
      margin: "-.0.3rem 0",
      fontSize: "14px",
      fontWeight: "bold",
      color: "black",
    },
    detalsH22: {
      color: "#9CA3AF",
    },

    buttonHolder: {
      width: "30%",
      textAlign: "end",
      paddingRight: ".2rem",
      zIndex: "100",
    },

    imdb: {
      color: "black",
      fontSize: "14px",
      display: "flex",
      whiteSpace: "nowrap",
      alignItems: "center",
    },

    rating: {
      display: "flex",
      gap: "9rem",
    },

    button: {
      padding: ".2rem .5rem",
      backgroundColor: theme.colors.blue,
      color: "#fff",
      border: `1px solid ${theme.colors.blue}`,
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "12px",
    },
    "button:disabled": {
      backgroundColor: "#000000",
      color: "white",
    },
    buttonSaved: {
      padding: ".2rem .5rem",
      backgroundColor: "black",
      color: "white",
      border: "1px solid black",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "12px",
    },

    "@media (max-width: 900px)": {
      movieCardImg: {
        width: "100%",
        objectFit: "cover",
      },
    },
  };
});

const MovieCard = ({
  poster,
  posterTitle,
  popularity,
  title,
  releaseDate,
  movie_id,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`movies/${movie_id}`);
  };

  return (
    <div data-testid="movie-card" className={classes.movieCard}>
      <img
        src={`https://image.tmdb.org/t/p/w300/${poster}`}
        alt={`${posterTitle} poster`}
        data-testid="movie-poster"
        onClick={handleDetails}
        className={classes.movieCardImg}
      />
      <div className={classes.desContainer}>
        <div className={classes.details}>
          <h3 data-testid="movie-title" className={classes.detalsH22}>
            USA, 2018
          </h3>
          <h3 data-testid="movie-title" className={classes.detalsH3}>
            {title}
          </h3>
          <div className={classes.rating}>
            <div className={classes.buttonHolder}>
              <span data-testid="popularity" className={classes.imdb}>
                <img src={imdb} alt="imdb" />
                {Math.floor(popularity)}/ 100
              </span>
            </div>

            <div className={classes.buttonHolder}>
              <span className={classes.imdb}>
                <img src={fruith} alt="fruith" />
                {Math.floor(popularity)}%
              </span>
            </div>
          </div>

          <span
            data-testid="movie-release-date"
            className={classes.detailsSpan}
          >
            {releaseDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
