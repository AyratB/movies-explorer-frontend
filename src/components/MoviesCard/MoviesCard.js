import React from "react";
import Button from "./../Button/Button";
import { BASE_MOVIES_IMAGE_URL } from "./../../utils/constants";

import './MoviesCard.css';

function MoviesCard(props) {

    // TODO необходимо проверять карточка кликнута или нет
    //   const isLiked = props.cardData.likes.some(
    //     (liker) => liker._id === currentUserId
    //   );

    const [isSaved, setIsSaved] = React.useState(false); //TODO имитация удалить

    const handleSaveMovie = () => {
        props.onMovieSave(props.cardData);
    }
    const handleDeleteMovie = () => {
        setIsSaved(false);
        // props.onMovieDelete(props.cardData); 
    }

    const [isSaveButtonVisible, setIsSaveButtonVisible] = React.useState(false);
  
    

    const setButtonVisible = () => setIsSaveButtonVisible(true);
    const setButtonUnVisible = () => setIsSaveButtonVisible(false);    

    return (
        <li className="card">
            <div className="card__image-wrapper" 
                onMouseEnter={setButtonVisible}
                onMouseLeave={setButtonUnVisible}>
                <div
                    style={ {
                        backgroundImage: `url(${BASE_MOVIES_IMAGE_URL}${props.cardData.image.url})`, 
                        backgroundSize: 'contain', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center' }}
                    className="card__image"/>

                <div className="card__saving-choice">

                    {props.isSavedMovies
                        ?   <Button type="button" className="button button_type_card__delete-movie" ariaLabel="Иконка удаления фильма из сохраненных"
                                onClick={handleDeleteMovie} style={{visibility: isSaveButtonVisible ? "visible" : "hidden"}}/>
                        
                        : isSaved
                
                            ?   <Button type="button" className="button button_type_card__saved-icon" ariaLabel="Иконка сохраненного фильма"
                                onClick={handleDeleteMovie} />
    
                            :   <Button type="button" className="button button_type_saved-movie" ariaLabel="Иконка сохранения"
                                onClick={handleSaveMovie} style={{visibility: isSaveButtonVisible ? "visible" : "hidden"}}>Сохранить</Button>          
                    }
                </div>
            </div>

            <div className="card__sign">
                <h3 className="card__description">{props.cardData.nameRU}</h3>
                <div className="card__timing">{props.cardData.duration}</div>
            </div>
        </li>
    );
}

export default MoviesCard;
