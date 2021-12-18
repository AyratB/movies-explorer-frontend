import React from "react";
import Button from "./../Button/Button";
import { BASE_MOVIES_IMAGE_URL } from "./../../utils/constants";
import { ExternalLink } from 'react-external-link';

import './MoviesCard.css';

const MoviesCard = React.memo((props) => {
    

    let isMovieSaved = props.movieObject["isSavedMovies"];

    let imageUrl = isMovieSaved
        ? `url(${props.cardData.image})`
        : `url(${BASE_MOVIES_IMAGE_URL}${props.cardData.image.url})`;

    let movieId = isMovieSaved
         ? props.cardData.movieId
         : props.cardData.id;

    let isNeedToShowSavedIcon = isMovieSaved || props.savedMoviesObject["fullMovies"].some((savedMovie) => savedMovie.movieId === movieId);

    const handleSaveMovie = () => props.onMovieSave(props.cardData);
    const handleDeleteMovie = () => props.onMovieDelete(movieId);

    const [isIconVisible, setIsIconVisible] = React.useState(false);
    const setIconVisible = () => setIsIconVisible(true);
    const setIconUnvisible = () => setIsIconVisible(false);

    return (
        <li className="card">
            <div className="card__image-wrapper" onMouseEnter={setIconVisible} onMouseLeave={setIconUnvisible}>
                
                <ExternalLink href={props.cardData.trailer} className="" target="_blank">
                    <div style={ {
                        backgroundImage: imageUrl,
                        backgroundSize: 'contain', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center' } }
                    className="card__image"/>
                </ExternalLink>

                <div className="card__saving-choice">

                    {isMovieSaved

                        ?   isIconVisible && <Button type="button" className="button button_type_card__delete-movie" ariaLabel="Иконка удаления фильма из сохраненных"
                                onClick={handleDeleteMovie}/>

                        :   isNeedToShowSavedIcon

                            ?   <Button type="button" className="button button_type_card__saved-icon" ariaLabel="Иконка сохраненного фильма"
                                    onClick={handleDeleteMovie}/>

                            :   isIconVisible && <Button type="button" className="button button_type_saved-movie" ariaLabel="Иконка сохранения"
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
