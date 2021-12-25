import React from "react";

import './FilterCheckbox.css';
import checkboxCircle from "./../../images/checkbox-circle.svg";

const FilterCheckbox = React.memo((props) => {

    const handleClick = () => {
        //отдельный поиск по клику по Короткометражке
        props.checked(!props.movieObject["shortChecked"]);
    }

    return (
        <div className="checkbox__wrapper">
            <div className={`checkbox__body ${props.movieObject["shortChecked"] ? "checkbox__body_type_reverse" : ""}`} onClick={handleClick}>
                <img className="checkbox__checker" alt="Переключатель" src={checkboxCircle}/>
            </div>
            <p className="checkbox__text">Короткометражки</p>
        </div>
    );
});

export default FilterCheckbox;