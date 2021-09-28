import React from "react";
import Header from "./../Header/Header.js";
import SearchForm from "./../SearchForm/SearchForm.js";
import MoviesCardList from "./../MoviesCardList/MoviesCardList.js";
import Footer from "./../Footer/Footer.js";
import Preloader from "./../Preloader/Preloader";

import { fakeMovieData } from "./../../utils/constants.js";

import './Movies.css';

const Movies = (props) => {

    const [isSearchGoing, setIsSearchGoing] = React.useState(false);

    const handleSearchRequest = (searchParam) => {
        setIsSearchGoing(true);
    }

    return (
        <>
            <section className="movies">
                <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
                <SearchForm onSubmit={handleSearchRequest}/>

                {isSearchGoing
                    ? <Preloader/>
                    : <MoviesCardList cards={fakeMovieData}/> 
                }
                      
            </section>
            <Footer />
        </>
    );
};

export default Movies;