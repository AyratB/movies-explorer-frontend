import React from "react";
import MoviesCard from "./../MoviesCard/MoviesCard";
import Button from "./../Button/Button";

import './MoviesCardList.css';

const MoviesCardList = (props) => {

    return (
        <section className="movies-cards">
            <ul className="movies-cards__list">
                {props.cards.map((card) => {
              
                    return (
                        <MoviesCard
                            key={card.id}
                            cardData={card}
                            onMovieSave={props.onMovieSave}
                            onMovieDelete={props.onMovieDelete}
                            isSavedMovies={props.isSavedMovies}
                            savedMovies={props.savedMovies}
                        />
                    );
                })}
            </ul>

            {props.cards.length !== props.totalMoviesCount
                ? <Button className="button button_type_add-movies" onClick={props.addCardsToShow}>Еще</Button>
                : <></>
            }
        </section>
    );
};

export default MoviesCardList;