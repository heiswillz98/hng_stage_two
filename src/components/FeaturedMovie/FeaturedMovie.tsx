import React, { useEffect, useState } from "react";
import styles from "./FeaturedMovie.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface FeaturedMovieProps {
  title: string;
  posterPath: string;
  voteAverage: number;
  overview: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genres: string;
  release_date: string;
  backdrop_path: string;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ voteAverage }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8a4fb1ae01edf56f094311d3e3fe04d7&page=1"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showStatus={false}
          showArrows={false}
        >
          {popularMovies.map((movie) => (
            <div>
              <div className={styles.posterImage}>
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                />
              </div>
              <div className={styles.posterImage__overlay}>
                <div className={styles.posterImage__title}>
                  {movie ? movie.title : ""}
                </div>
                <div
                  className={`${styles.posterImage__runtime} flex items-center`}
                >
                  <div className="w-[35px] h-[17px]">
                    <Image
                      src="/icons/imdb.svg"
                      alt="Next.js Logo"
                      width={10}
                      height={10}
                    />
                  </div>

                  <span className={`${styles.posterImage__rating} ml-2`}>
                    {movie ? movie.vote_average * 10 : ""}/ 100
                  </span>
                  <div className="flex items-center gap-2 ml-6">
                    <Image
                      src="/icons/tomatoes.svg"
                      alt="tomatoes"
                      width={16}
                      height={17}
                    />
                    <h5 className="text-[white] font-sans font-[400] text-[12px]">
                      {Math.floor(voteAverage * 10)}%
                    </h5>
                  </div>
                </div>
                <div className={styles.posterImage__description}>
                  {movie ? movie.overview : ""}
                </div>

                <div className="w-[169px] h-[36px] bg-[#BE123C] mb-2">
                  <span className="flex items-center mt-2 ml-3">
                    <div className="w-[20px] h-[20px]">
                      <Image
                        src="/icons/play.svg"
                        alt="Next.js Logo"
                        width={10}
                        height={10}
                      />
                    </div>
                    <p className="f font-bold text-[#fff] text-[14px]">
                      WATCH TRAILER
                    </p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default FeaturedMovie;
