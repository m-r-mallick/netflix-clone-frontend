import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";

const BASE_URL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
   const [movies, setMovies] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const request = await axios.get(fetchUrl);
         return request.data.results;
      };
      fetchData()
         .then((res) => setMovies(res))
         .catch((err) => console.log(`err`, err));
   }, [fetchUrl]);

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
                     alt={movie.name}
                  />
               ))}
         </div>
      </div>
   );
};

export default Row;
