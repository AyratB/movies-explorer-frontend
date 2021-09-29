import React from "react";
import Button from "./../Button/Button";

import './MoviesCard.css';

function MoviesCard(props) {
    
    const [isSaved, setIsSaved] = React.useState(false); //имитация

    const handleSaveFilm = () => {
        
        setIsSaved(true);
        //   props.onFilmSave(props.cardData);
    }
    const handleDeleteFilm = () => {
        setIsSaved(false);
        // props.onFilmDelete(props.cardData); 
    }

    const [isSaveButtonVisible, setIsSaveButtonVisible] = React.useState(false);
  
    //   const isLiked = props.cardData.likes.some(
    //     (liker) => liker._id === currentUserId
    //   );

    const setButtonVisible = () => setIsSaveButtonVisible(true);
    const setButtonUnVisible = () => setIsSaveButtonVisible(false);    

    return (
        <li className="card">
            <div className="card__image-wrapper" 
                onMouseEnter={setButtonVisible}
                onMouseLeave={setButtonUnVisible}>
                <div
                    style={ { 
                        backgroundImage: `url(${props.cardData.url})`, 
                        backgroundSize: 'contain', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center' }}
                    className="card__image"/>

                <div className="card__saving-choice">

                    {props.isSavedFilms
                        ?   <Button type="button" className="button button_type_card__delete-film" ariaLabel="Иконка удаления фильма из сохраненных"
                                onClick={handleDeleteFilm} />
                        
                        : isSaved
                
                            ?   <Button type="button" className="button button_type_card__saved-icon" ariaLabel="Иконка сохраненного фильма"
                                onClick={handleDeleteFilm} />
    
                            :   <Button type="button" className="button button_type_saved-film" ariaLabel="Иконка сохранения"
                                onClick={handleSaveFilm} style={{visibility: isSaveButtonVisible ? "visible" : "hidden"}}>Сохранить</Button>          
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
