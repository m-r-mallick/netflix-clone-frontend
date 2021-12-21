import axios from "../axios";
import React, { useEffect, useState } from "react";
import requests from "../requests";
import "./Banner.css";

const Banner = () => {
   const [movie, setMovie] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const request = await axios.get(requests.fetchNetflixOriginals);
         setMovie(
            request.data.results[
               Math.floor(Math.random() * request.data.results.length)
            ]
         );
         return request;
      };
      fetchData();
   }, []);

   const truncate = (str, num) => {
      return str?.length > num ? str.substr(0, num - 1) + "..." : str;
   };

   return (
      <header
         className="banner"
         style={{
            backgroundSize: "cover",
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
               movie.poster_path || movie.backdrop_path
            })`,
            backgroundPosition: "center center",
         }}
      >
         <div className="banner_contents">
            <h1 className="banner_title">
               {movie?.name || movie?.name || movie?.original_name}
            </h1>
            <div className="banner_buttons">
               <button className="banner_button">Play</button>
               <button className="banner_button">My List</button>
            </div>
            <h1 className="banner_description">
               {truncate(movie?.overview, 150)}
            </h1>
         </div>
         <div className="banner--fadeBottom" />
      </header>
   );
};

export default Banner;
