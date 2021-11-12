import React from "react";
import Header from "./../Header/Header.js";
import SearchForm from "./../SearchForm/SearchForm.js";
import MoviesCardList from "./../MoviesCardList/MoviesCardList.js";
import Footer from "./../Footer/Footer.js";
import Preloader from "./../Preloader/Preloader";
import './Movies.css';

const Movies = (props) => {

    const [isSearchGoing, setIsSearchGoing] = React.useState(false);

    const handleSearchRequest = (searchParam) => {
        debugger;
        setIsSearchGoing(true);

        //поиск
        //props.handleSearchRequest();

        //setIsSearchGoing(false);
        setTimeout(() => setIsSearchGoing(false), 3_000);
    }

    return (
        <>
            <section className="movies">
                <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
                <SearchForm onSubmit={handleSearchRequest} isSavedFilms={props.isSavedMovies}/>

                {isSearchGoing
                    ? <Preloader/>
                    : <MoviesCardList 
                        cards={props.movieCardsData}
                        isSavedMovies={props.isSavedMovies}/> 
                }
                      
            </section>
            <Footer />
        </>
    );
};

export default Movies;