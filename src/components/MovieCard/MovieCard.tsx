import React from "react";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  posterPath: string;
  voteAverage: number;
  overview: string;
  genres?: {
    id: number;
    name: string;
  }[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  voteAverage,
  overview,
  genres,
}) => {
  const imgPath = "http://image.tmdb.org/t/p/w500";

  return (
    <div data-testid=" movie-card" className="w-[250px] h-[490px]">
      <div className="relative">
        <img
          data-testid=" movie-poster"
          src={`${imgPath}${posterPath}`}
          alt={title}
          className="relative h-[370px] w-[250px]"
        />
        <Image
          className="absolute top-[1rem] right-4"
          src="/icons/favorite.svg"
          alt="tomatoes"
          width={16}
          height={17}
        />
      </div>

      <div className="movie-info">
        <p
          data-testid="movie-title"
          className="font-bold text-[#8CA3AF] text-[12px] font-sans"
        >
          USA, 2018
        </p>

        <p
          data-testid="movie-title"
          className="font-bold text-[#111827] text-[18px] font-sans"
        >
          {title}
        </p>
        <div className="flex gap-[6rem] mt-1">
          <div className="flex items-center gap-2">
            <Image src="/icons/imdb.svg" alt="imdb" width={35} height={14} />
            <h5>{Math.floor(voteAverage * 10)}.0/100</h5>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/icons/tomatoes.svg"
              alt="tomatoes"
              width={16}
              height={17}
            />
            <h5>{Math.floor(voteAverage * 10)}%</h5>
          </div>
        </div>

        {genres && genres.length > 0 && (
          <p className="font-bold text-[#9CA3AF] text-[12px] font-sans mt-1">
            Genres: {genres.map((genre) => genre.name).join(", ")}
          </p>
        )}
        <p className="font-bold text-[#9CA3AF] text-[12px] font-sans mt-1">
          Action Adventure Horror
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
