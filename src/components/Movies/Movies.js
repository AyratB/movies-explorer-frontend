import React from "react";
import Header from "./../Header/Header.js";
import SearchForm from "./../SearchForm/SearchForm.js";
import MoviesCardList from "./../MoviesCardList/MoviesCardList.js";

import Footer from "./../Footer/Footer.js";

import { fakeMovieData } from "./../../utils/constants.js";

import './Movies.css';

const Movies = (props) => {
  return (
    <>
        <section className="movies">
            <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
            <SearchForm/>
            <MoviesCardList cards={fakeMovieData}/>        
        </section>
        <Footer />
    </>
  );
};

export default Movies;