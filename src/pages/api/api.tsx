// import axios from "axios";

import axios from "axios";

// const BASE_URL = "https://api.themoviedb.org/3";
const BASE_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMovieById = async (movieId: string) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movie details.");
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axiosInstance.get("/movie/popular");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch popular movies.");
  }
};

// Function to fetch both featured movie and popular movies
export const fetchFeaturedAndPopularMovies = async () => {
  try {
    // Example API call to fetch a featured movie by ID (adjust as needed)
    const featuredMovieData = await fetchMovieById(
      "your_featured_movie_id_here"
    );

    // Example API call to fetch popular movies (adjust as needed)
    const popularMoviesData = await fetchPopularMovies();

    return {
      featuredMovie: featuredMovieData,
      popularMovies: popularMoviesData.results, // Assuming results contain an array of popular movies
    };
  } catch (error) {
    throw new Error("Failed to fetch featured and popular movies.");
  }
};
