import React from "react";
import { Link } from "react-router-dom";
import './Main.css';

import Promo from "./../Promo/Promo";
import AboutProject from "./../AboutProject/AboutProject";

function Main(props) {  

  return (
      <main className="main">
          <Promo isLoggedIn={props.isLoggedIn}/>          
          <AboutProject/>
      </main>     
  );
}

export default Main;