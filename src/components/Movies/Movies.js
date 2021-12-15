import React from "react";
import Header from "./../Header/Header.js";
import SearchForm from "./../SearchForm/SearchForm.js";
import MoviesCardList from "./../MoviesCardList/MoviesCardList.js";
import Footer from "./../Footer/Footer.js";
import Preloader from "./../Preloader/Preloader";
import './Movies.css';

const Movies = React.memo((props) => {

    const [emptySearchWords, setEmptySearchWords] = React.useState("");

    const handleSearchRequest = (searchValue, isChecked) => {
        setEmptySearchWords("Ничего не найдено");

        props.commonMoviesSearchHandler(searchValue, isChecked, props.movieObject);
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
      }, [props.movieObject]);

    return (
        <>
            <section className="movies">
                <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>

                <SearchForm
                    movieObject ={props.movieObject}
                    onSubmit={handleSearchRequest} 
                    deleteEmptySearchResult={deleteEmptySearchResult}/>

                {props.isMoviesSearchGoing
                    ? <Preloader/>

                    : props.movieCardsData.length !== 0
                        ? <MoviesCardList 
                            cards={props.movieCardsData}
                            addCardsToShow={props.addCardsToShow}
                            onMovieSave={props.onMovieSave}
                            onMovieDelete={props.onMovieDelete}
                            savedMoviesObject={props.savedMoviesObject}
                            movieObject ={props.movieObject}/>                        

                        : <div style={emptyMessageStyle}>{props.connectionErrorMessage || emptySearchWords}</div>
                }

            </section>
            <Footer />
        </>
    );
});

export default Movies;