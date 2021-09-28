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
                            key={card._id}
                            cardData={card}
                            onCardLike={props.onCardLike}
                            onCardDislike={props.onDislike}
                        />
                    );
                })}
            </ul>

            <Button className="button button_type_add-films">Еще</Button>
        </section>
    );
};

export default MoviesCardList;