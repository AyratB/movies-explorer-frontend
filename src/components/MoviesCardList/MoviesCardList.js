import React from "react";
import MoviesCard from "./../MoviesCard/MoviesCard";
import Button from "./../Button/Button";

import './MoviesCardList.css';

const MoviesCardList = React.memo((props) => {

    let isSavedMovies = props.isSavedMovie;

    return (
        <section className="movies-cards">
            <ul className="movies-cards__list">
                {props.moviesCardData.map((card) => {

                    let movieId = isSavedMovies ? card.movieId : card.id;

                    let isNeedToShowSavedIcon = isSavedMovies
                        ? true
                        : props.savedMovies.some((savedMovie) => savedMovie.movieId === movieId);

                    return (
                        <MoviesCard
                            key={movieId}
                            cardData={card}
                            onMovieSave={props.onMovieSave}
                            onMovieDelete={props.onMovieDelete}
                            isNeedToShowSavedIcon={isNeedToShowSavedIcon}
                            isSavedMovies={isSavedMovies}
                            movieId={movieId}
                            cardClick={props.cardClick}
                        />
                    );
                })}
            </ul>

            { isSavedMovies
                ? <></>
                : props.isNeedToHideAddButton 
                    ? <></>  
                    : <Button className="button button_type_add-movies" onClick={props.addCardsToShow}>Еще</Button>                     
            }
        </section>
    );
});

export default MoviesCardList;