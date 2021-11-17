import React from "react";
import Header from "./../Header/Header.js";
import SearchForm from "./../SearchForm/SearchForm.js";
import MoviesCardList from "./../MoviesCardList/MoviesCardList.js";
import Footer from "./../Footer/Footer.js";
import Preloader from "./../Preloader/Preloader";
import './Movies.css';

const Movies = (props) => {
    
    const [emptySearchWords, setEmptySearchWords] = React.useState("");

    const handleSearchRequest = ({searchValue, formCleaner, isChecked}) => {
        setEmptySearchWords("Ничего не найдено");     
        props.handleSearchRequest(searchValue, formCleaner, isChecked);
    }

    const deleteEmptySearchResult = () => {
        setEmptySearchWords("");
    }

    return (
        <>
            <section className="movies">
                <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
                <SearchForm previousSearchValue={props.previousSearchValue} onSubmit={handleSearchRequest} isSavedFilms={props.isSavedMovies} deleteEmptySearchResult={deleteEmptySearchResult}/>

                {props.isMoviesSearchGoing
                    ? <Preloader/>
                    : props.totalMoviesCount === 0 
                        ? <div style={ {
                            'fontSize': '18px',
                            'fontFamily': 'Inter',
                            'color': '#FFFFFF',
                            'textAlign': 'center',
                        }}>{props.connectionErrorMessage || emptySearchWords}</div>
                        : <MoviesCardList 
                                cards={props.movieCardsData}
                                isSavedMovies={props.isSavedMovies}
                                totalMoviesCount={props.totalMoviesCount}
                                addCardsToShow={props.addCardsToShow}
                                />
                }

            </section>
            <Footer />
        </>
    );
};

export default Movies;