import React from "react";
import MoviesCard from "./../MoviesCard/MoviesCard";
import Button from "./../Button/Button";

import './MoviesCardList.css';

const MoviesCardList = (props) => {

    // TODO: c кнопкой еще

    // debugger;

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
                        />
                    );
                })}
            </ul>

            {props.isSavedMovies
                ? <></>
                : <Button className="button button_type_add-movies">Еще</Button>
            }
        </section>
    );
};

export default MoviesCardList;