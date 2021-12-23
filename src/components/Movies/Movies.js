import React from "react";
import Header from "./../Header/Header.js";
import SearchForm from "./../SearchForm/SearchForm.js";
import MoviesCardList from "./../MoviesCardList/MoviesCardList.js";
import Footer from "./../Footer/Footer.js";
import Preloader from "./../Preloader/Preloader";
import './Movies.css';

const Movies = React.memo((props) => {

    const [emptySearchWords, setEmptySearchWords] = React.useState("");

    const handleSearchRequest = ({searchValue, isChecked}) => {

        setEmptySearchWords("Ничего не найдено");

        props.handleSearchRequest(searchValue, isChecked, props.movieObject);
    }

    const deleteEmptySearchResult = () => {
        setEmptySearchWords("");
    }

    let emptyMessageStyle = {
        'fontSize': '18px',
        'fontFamily': 'Inter',
        'color': '#FFFFFF',
        'textAlign': 'center',
    }

    React.useEffect(() => {
        setEmptySearchWords("");

        if (!props.movieObject.isSavedMovies && props.recalculateCardsNumber) {
            props.recalculateCardsNumber();
        } 

      }, [props.movieObject]);

    return (
        <>
            <section className="movies">
                <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>

                <SearchForm
                    movieObject ={props.movieObject}
                    onSubmit={handleSearchRequest} 
                    deleteEmptySearchResult={deleteEmptySearchResult}
                    isMoviesSearchGoing={props.isMoviesSearchGoing}/>

                {props.isMoviesSearchGoing
                    ? <Preloader/>

                    : props.moviesCardData.length !== 0
                    
                        ? <MoviesCardList
                            moviesCardData={props.moviesCardData}
                            addCardsToShow={props.addCardsToShow}
                            onMovieSave={props.onMovieSave}
                            onMovieDelete={props.onMovieDelete}
                            savedMoviesObject={props.savedMoviesObject}
                            movieObject ={props.movieObject}
                            isNeedToHideAddButton={props.isNeedToHideAddButton}
                            savedMovies={props.savedMovies}
                            isSavedMovie={props.isSavedMovie}                            
                            />

                        : <div style={emptyMessageStyle}>{props.connectionErrorMessage || emptySearchWords}</div>
                }

            </section>
            <Footer />
        </>
    );
});

export default Movies;