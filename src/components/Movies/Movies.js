import React from "react";
import Header from "./../Header/Header.js";
import SearchForm from "./../SearchForm/SearchForm.js";


import './Movies.css';


const Movies = (props) => {
  return (
    <div className="movies">
        <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
        <SearchForm/>

    </div>
  );
};

export default Movies;