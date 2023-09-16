import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import YouTube from "react-youtube";

interface Movie {
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  trailer_url: string;
  runtime: string;
  genres: {
    id: number;
    name: string;
  }[];
  videos: {
    results: {
      key: string;
      type: string;
    }[];
  };
  credits: {
    crew: {
      job: string;
      name: string;
    }[];
  };
}

const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [directors, setDirectors] = useState<string[]>([]);
  const [writers, setWriters] = useState<string[]>([]);
  const [stars, setStars] = useState<string[]>([]);
  const [upcomingShows, setUpcomingShows] = useState<any[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const movieApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=8a4fb1ae01edf56f094311d3e3fe04d7`;
      const videosApiUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=8a4fb1ae01edf56f094311d3e3fe04d7`;
      const creditsApiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8a4fb1ae01edf56f094311d3e3fe04d7`; // New API endpoint for credits

      // Fetch movie details
      axios
        .get(movieApiUrl)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });

      // Fetch videos associated with the movie
      axios
        .get(videosApiUrl)
        .then((response) => {
          const trailer = response.data.results.find(
            (video: { type: string }) => video.type === "Trailer"
          );
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching movie videos:", error);
        });

      // Fetch movie credits to get director, writer, and star information
      axios
        .get(creditsApiUrl)
        .then((response) => {
          const movieCredits = response.data;
          const directorNames = movieCredits.crew
            .filter((crewMember: any) => crewMember.job === "Director")
            .map((director: any) => director.name);

          const writerNames = movieCredits.crew
            .filter((crewMember: any) => crewMember.department === "Writing")
            .map((writer: any) => writer.name);

          const starNames = movieCredits.cast.map(
            (castMember: any) => castMember.name
          );

          setDirectors(directorNames);
          setWriters(writerNames);
          setStars(starNames);
        })
        .catch((error) => {
          console.error("Error fetching movie credits:", error);
        });
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const convertToUTC = (dateString: string) => {
    const inputDate = new Date(dateString);
    const utcDateString = inputDate.toISOString();
    return utcDateString;
  };

  const releaseDateUTC = convertToUTC(movie.release_date);

  function formatRuntime(runtime: any): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  }

  return (
    <div className="flex gap-8 ">
      <div className="h-[982px] w-[250px] border border-r border-[#000000] rounded-[45px]">
        <div className="flex gap-4 items-center px-2 mt-16">
          <Image src="/icons/tv.svg" alt="TV Logo" width={50} height={50} />
          <h1 className="font-sans text-[24px] ">MovieBox</h1>
        </div>
        <div className="flex w-[226px] h-[86px] items-center gap-4 px-4 mt-8 hover:bg-[#F8E7EB]">
          <Image src="/icons/home.svg" alt="TV Logo" width={25} height={25} />
          <p className=" font-[600] text-[20px] text-[#666666] cursor-pointer hover:text-[#BE123C]">
            Home
          </p>
        </div>
        <div className="flex w-[226px] h-[86px] items-center gap-4 px-4 mt-8 hover:bg-[#F8E7EB]">
          <Image
            src="/icons/projector.svg"
            alt="TV Logo"
            width={25}
            height={25}
          />
          <p className=" font-[600] text-[20px] text-[#666666] cursor-pointer hover:text-[#BE123C]">
            Movies
          </p>
        </div>
        <div className="flex w-[226px] h-[86px] items-center gap-4 px-4 mt-8 hover:bg-[#F8E7EB]">
          <Image src="/icons/tvshow.svg" alt="TV Logo" width={25} height={25} />
          <p className=" font-[600] text-[20px] text-[#666666] cursor-pointer hover:text-[#BE123C]">
            Tv Series
          </p>
        </div>
        <div className="flex w-[226px] h-[86px] items-center gap-4 px-4 mt-8 hover:bg-[#F8E7EB]">
          <Image
            src="/icons/calendar.svg"
            alt="TV Logo"
            width={25}
            height={25}
          />
          <p className=" font-[600] text-[20px] text-[#666666] cursor-pointer hover:text-[#BE123C]">
            Upcoming
          </p>
        </div>
        <div className="w-[170px] h-[210px] rounded-[20px] bg-[#F8E7EB] border border-[#BE123C] ml-2 mt-12">
          <div className="mt-8">
            <p className="px-4  text-[#333333]">
              Play movie quizes and earn free tickets
            </p>
            <p className="w-[139px] px-4 text-[#666666] mt-1">
              50k people are playing now
            </p>
            <button className="w-[112px] h-[30px] bg-[#cc8c9d] rounded-[30px] mx-4 mt-2">
              <p className="text-[#BE123C] font-[500] text-[12px]">
                start playing
              </p>
            </button>
          </div>
        </div>
        <div className="flex w-[226px] h-[86px] items-center gap-4 px-4 mt-8 hover:bg-[#F8E7EB]">
          <Image src="/icons/logout.svg" alt="TV Logo" width={25} height={25} />
          <p className=" font-[600] text-[20px] text-[#666666] cursor-pointer hover:text-[#BE123C]">
            Logout
          </p>
        </div>
      </div>
      <div className="mt-16">
        <div className="w-[1198px] h-[449px]">
          {trailerUrl && (
            <YouTube
              videoId={trailerUrl.substring(trailerUrl.lastIndexOf("=") + 1)}
              opts={{ width: "1198px", height: "449px" }}
            />
          )}
        </div>

        <div className="w-[1198px] flex items-center gap-4 mt-6">
          <p
            data-testid="movie-title movie-release-date movie-runtime"
            className="font-bold text-[#404040] text-[23px] leading-[34.5px] whitespace-nowrap"
          >
            {movie.title} • {releaseDateUTC} • PG-13 •
            {formatRuntime(movie.runtime)}
          </p>
          {movie.genres.map((genre) => (
            <div className="w-[84px] h-[30px] rounded-[15px] bg-[#F8E7EB] border ">
              <p
                key={genre.id}
                className="font-[500] text-[15px] text-[#B91C1C] text-center mt-[2px] m-1"
              >
                {genre.name}
              </p>
            </div>
          ))}
          <div className="flex items-center ml-auto">
            <Image src="/icons/star.svg" alt="TV Logo" width={30} height={30} />
            <p>
              <span className="text-[#E8E8E8]">{movie.vote_average}</span> |
              350k
            </p>
          </div>
        </div>

        <div className="flex mt-4 w-[1198px]">
          <p
            data-testid="movie-overview"
            className="w-[774px] text-[20px] font-[400] leading-[30px]"
          >
            {movie.overview}
          </p>
          <div className="ml-auto">
            <div className="flex items-center justify-center w-[360px] h-[55px] rounded-[10px] bg-[#BE123C]">
              <Image
                src="/icons/ticket.svg"
                alt="TV Logo"
                width={30}
                height={30}
              />

              <p className="text-white"> See Showtimes</p>
            </div>
            <div className="flex items-center justify-center w-[360px] h-[55px] rounded-[10px] bg-[#BE123C1A] mt-2">
              <Image
                src="/icons/list.svg"
                alt="TV Logo"
                width={23}
                height={23}
              />

              <p className="text-[#33333]"> More watch options</p>
            </div>
          </div>
        </div>

        <div className=" mt-4">
          <p>
            <span className="font-[400] text-[20px] text-[#333333]">
              Directors:
            </span>
            <span className="ml-1 font-[400] text-[20px] text-[#BE123C]">
              {directors.join(", ")}
            </span>
          </p>

          <p className="mt-2">
            <span className="font-[400] text-[20px] text-[#333333]">
              Writers:
            </span>
            <span className="ml-1 font-[400] text-[20px] text-[#BE123C]">
              {writers.join(", ")}
            </span>
          </p>

          <p className="mt-2">
            <span className="font-[400] text-[20px] text-[#333333]">
              Stars:
            </span>
            <span className="ml-1 font-[400] text-[20px] text-[#BE123C]">
              {stars.join(", ")}
            </span>
          </p>

          <div className="flex items-center w-[1198px]">
            <div className="flex items-center justify-center w-[353px] h-[55px] rounded-[10px] bg-[#BE123C]">
              <p className="text-white font-[500] text-[20px]">
                {" "}
                Top rated movie #65
              </p>
            </div>
            <div className="flex items-center justify-center w-[532px] h-[55px] rounded-[10px] border border-[#C7C7C7] ">
              <p className="text-[#333333] font-[500] text-[20px]">
                Awards 9 nominations
              </p>
              <Image
                src="/icons/arrow.svg"
                alt="TV Logo"
                width={30}
                height={30}
                className="ml-auto"
              />
            </div>

            <div className="w-[360px] ml-6">
              <div className="flex items-center  ">
                <img
                  src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[110px] h-[230]"
                />
                <img
                  src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[110px] h-[230]"
                />
                <img
                  src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[110px] h-[230]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
