import React from "react";

import './FilterCheckbox.css';
import checkboxCircle from "./../../images/checkbox-circle.svg";

const FilterCheckbox = (props) => {

    const [isChecked, setIsChecked] = React.useState(props.isChecked);

    const handleClick = () => {        
        props.checked(!isChecked);
        setIsChecked(!isChecked);
    }

    return (
        <div className="checkbox__wrapper">
            <div className={`checkbox__body ${isChecked ? "checkbox__body_type_reverse" : ""}`} onClick={handleClick}>
                <img className="checkbox__checker" alt="Переключатель" src={checkboxCircle}/>
            </div>
            <p className="checkbox__text">Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox;