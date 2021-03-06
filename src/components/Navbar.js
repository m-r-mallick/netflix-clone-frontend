import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
   const [show, setShow] = useState(false);

   useEffect(() => {
      window.addEventListener("scroll", () => {
         if (window.scrollY > 100) {
            setShow(true);
         } else {
            setShow(false);
         }
      });
      return () => {
         window.removeEventListener("scroll");
      };
   }, []);

   return (
      <div className={`nav ${show && "nav_black"}`}>
         <img
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png"
            alt="netflix-logo"
         />
         <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
            className="nav_avatar"
         />
      </div>
   );
};

export default Navbar;
