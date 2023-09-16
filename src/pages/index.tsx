import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard/MovieCard";
import SearchForm from "@/components/SearchForm/Search";
import Link from "next/link";
import FeaturedMovie from "@/components/FeaturedMovie/FeaturedMovie";
import Image from "next/image";

import Footer from "@/components/Footer/Footer";

const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8a4fb1ae01edf56f094311d3e3fe04d7&page=1";

const featuredMovieUrl =
  "https://api.themoviedb.org/3/movie/335777?api_key=8a4fb1ae01edf56f094311d3e3fe04d7";

const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=8a4fb1ae01edf56f094311d3e3fe04d7&language=en-US&query=";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genres: {
    id: number;
    name: string;
  }[];
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeaturedMovie(featuredMovieUrl);

    getMovies(apiUrl);
  }, []);

  const getMovies = async (url: string) => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getFeaturedMovie = async (url: string) => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      setFeaturedMovie(data);
    } catch (error) {
      console.error("Error fetching featured movie:", error);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim() === "") return;

    setLoading(true);

    try {
      const response = await axios.get(`${searchUrl}${searchTerm}&page=1`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* <Navbar /> */}

      {featuredMovie && (
        <div className="relative">
          <FeaturedMovie
            title={featuredMovie.title}
            posterPath={featuredMovie.poster_path}
            voteAverage={featuredMovie.vote_average}
            overview={featuredMovie.overview}
          />
          <div className="flex absolute top-2 items-center gap-[15rem]">
            <div className="ml-6 flex items-center gap-4">
              <Image src="/icons/tv.svg" alt="TV Logo" width={50} height={50} />
              <h1 className="text-white font-sans text-[24px] ">MovieBox</h1>
            </div>
            <div>
              <SearchForm onSearch={handleSearch} />
            </div>
            <div className="flex items-center gap-4 ">
              <h1 className="text-white">Sign in</h1>
              <Image
                src="/icons/menu.svg"
                alt="Next.js Logo"
                width={36}
                height={36}
              />{" "}
            </div>
          </div>
        </div>
      )}

      <div className="movie-grid">
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-4 w-[1240px] gap-6 mx-auto ">
            {searchResults.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                genres={movie.genres}
              />
            ))}
          </div>
        ) : (
          <div className=" grid grid-cols-1  md:grid-cols-4 w-[1240px] gap-6 mx-auto mt-6 ">
            {movies.slice(0, 10).map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  voteAverage={movie.vote_average}
                  overview={""}
                  genres={movie.genres}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mx-[30rem] items-center justify-center ">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
