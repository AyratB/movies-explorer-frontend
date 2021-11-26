import React from "react";
import Button from "./../Button/Button";
import { BASE_MOVIES_IMAGE_URL } from "./../../utils/constants";

import './MoviesCard.css';

const MoviesCard = React.memo((props) => {

    let imageUrl = props.isSavedMovies
        ? `url(${props.cardData.image})`
        : `url(${BASE_MOVIES_IMAGE_URL}${props.cardData.image.url})`;

    let movieId = props.isSavedMovies ? props.cardData.movieId : props.cardData.id;
    let isSavedMovie = props.isSavedMovies ? true : props.savedMovies.some((savedMovie) => savedMovie.movieId === movieId);

    const handleSaveMovie = () => props.onMovieSave(props.cardData);    
    const handleDeleteMovie = () => props.onMovieDelete(movieId);    

    const [isSaveButtonVisible, setIsSaveButtonVisible] = React.useState(false);
    const setButtonVisible = () => setIsSaveButtonVisible(true);
    const setButtonUnVisible = () => setIsSaveButtonVisible(false);

    return (
        <li className="card">
            <div className="card__image-wrapper" onMouseEnter={setButtonVisible} onMouseLeave={setButtonUnVisible}>
                <div style={ {
                        backgroundImage: imageUrl,
                        backgroundSize: 'contain', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center' }}
                    className="card__image"/>
                <div className="card__saving-choice">

                    {props.isSavedMovies

                        ?   isSaveButtonVisible && <Button type="button" className="button button_type_card__delete-movie" ariaLabel="Иконка удаления фильма из сохраненных"
                                onClick={handleDeleteMovie}/>

                        :   isSavedMovie

                            ?   <Button type="button" className="button button_type_card__saved-icon" ariaLabel="Иконка сохраненного фильма"
                                    onClick={handleDeleteMovie}/>

                            :   isSaveButtonVisible && <Button type="button" className="button button_type_saved-movie" ariaLabel="Иконка сохранения"
                                    onClick={handleSaveMovie}>Сохранить</Button>
                    }
                </div>
            </div>

            <div className="card__sign">
                <h3 className="card__description">{props.cardData.nameRU}</h3>
                <div className="card__timing">{props.cardData.duration}</div>
            </div>
        </li>
    );
});

export default MoviesCard;
