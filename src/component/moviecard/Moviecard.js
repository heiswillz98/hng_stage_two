import React from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { fruith } from "../../assets/index";

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
      color: theme.colors.blue,
      fontSize: "14px",
    },
    detalsH3: {
      margin: "-.0.3rem 0",
      fontSize: "14px",
      fontWeight: "bold",
      color: "black",
    },

    buttonHolder: {
      width: "30%",
      textAlign: "end",
      paddingRight: ".2rem",
      zIndex: "100",
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
          <span data-testid="popularity" className={classes.detailsSpan}>
            {popularity}
          </span>
          <h3 data-testid="movie-title" className={classes.detalsH3}>
            {title}
          </h3>
          <span
            data-testid="movie-release-date"
            className={classes.detailsSpan}
          >
            {releaseDate}
          </span>
        </div>
        <div className={classes.buttonHolder}>
          <img src={fruith} alt="fruith" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
