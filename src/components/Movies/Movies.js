import React from "react";
import Header from "./../Header/Header.js";
import SearchForm from "./../SearchForm/SearchForm.js";
import MoviesCardList from "./../MoviesCardList/MoviesCardList.js";
import Footer from "./../Footer/Footer.js";
import Preloader from "./../Preloader/Preloader";
import './Movies.css';

const Movies = (props) => {

    const handleSearchRequest = ({searchValue, formCleaner, isChecked}) => {       
        props.handleSearchRequest(searchValue, formCleaner, isChecked);
    }

    return (
        <>
            <section className="movies">
                <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
                <SearchForm previousSearchValue={props.previousSearchValue} onSubmit={handleSearchRequest} isSavedFilms={props.isSavedMovies}/>

                {props.isMoviesSearchGoing
                    ? <Preloader/>
                    : <MoviesCardList 
                        cards={props.movieCardsData}
                        isSavedMovies={props.isSavedMovies}
                        totalMoviesCount={props.totalMoviesCount}
                        addCardsToShow={props.addCardsToShow}/>
                }

            </section>
            <Footer />
        </>
    );
};

export default Movies;