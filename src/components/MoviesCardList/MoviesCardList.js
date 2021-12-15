import React from "react";
import MoviesCard from "./../MoviesCard/MoviesCard";
import Button from "./../Button/Button";

import './MoviesCardList.css';

const MoviesCardList = React.memo((props) => {

    let isSavedMovies = props.movieObject["isSavedMovies"];

    let isNeedToShowAddButton = isSavedMovies || props.movieObject["filteredMoviesByWidth"].length === props.movieObject["filteredMovies"].length;

    return (
        <section className="movies-cards">
            <ul className="movies-cards__list">
                {props.cards.map((card) => {

                    return (
                        <MoviesCard
                            key={ isSavedMovies ? card.movieId : card.id}
                            cardData={card}
                            onMovieSave={props.onMovieSave}
                            onMovieDelete={props.onMovieDelete}

                            // для вывода иконки сохраненного фильма
                            savedMoviesObject={props.savedMoviesObject}
                            movieObject ={props.movieObject}
                        />
                    );
                })}
            </ul>

            { isNeedToShowAddButton
                ? <></>
                : <Button className="button button_type_add-movies" onClick={props.addCardsToShow}>Еще</Button>
            }
        </section>
    );
});

export default MoviesCardList;