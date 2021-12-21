import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const BASE_URL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
   const [movies, setMovies] = useState([]);
   const [trailerUrl, setTrailerUrl] = useState("");

   useEffect(() => {
      const fetchData = async () => {
         const request = await axios.get(fetchUrl);
         return request.data.results;
      };
      fetchData()
         .then((res) => setMovies(res))
         .catch((err) => console.log(`err`, err));
   }, [fetchUrl]);

   const opts = {
      height: "390",
      width: "100%",
      playerVars: {
         autoplay: 1,
      },
   };

   const handleClick = (movie) => {
      if (trailerUrl) {
         setTrailerUrl(``);
      } else {
         movieTrailer(movie.name || movie.title || "")
            .then((url) => {
               const urlParams = new URLSearchParams(new URL(url).search);
               setTrailerUrl(urlParams.get(`v`));
            })
            .catch((err) => console.log(err));
      }
   };

   return (
      <div className="row">
         <h2>{title}</h2>
         <div className="row_posters">
            {movies.length > 0 &&
               movies.map((movie) => (
                  <img
                     className={`row_poster ${
                        isLargeRow ? "row_posterLarge" : ""
                     }`}
                     key={movie.id}
                     src={BASE_URL.concat(
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                     )}
                     alt={movie.title}
                     onClick={() => {
                        handleClick(movie);
                        console.log(movie);
                     }}
                  />
               ))}
         </div>
         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
   );
};

export default Row;
