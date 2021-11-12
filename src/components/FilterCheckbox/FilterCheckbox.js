import React from "react";

import './FilterCheckbox.css';
import checkboxCircle from "./../../images/checkbox-circle.svg";

const FilterCheckbox = (props) => {

    const [isChecked, setIsChecked] = React.useState(true);

    const handleClick = () => {
        setIsChecked(!isChecked);
        props.checked(isChecked);
    }

    return (
        <div className="checkbox__wrapper" onClick={handleClick}>
            <div className={`checkbox__body ${isChecked ? "" : "checkbox__body_type_reverse"}`}>
                <img className="checkbox__checker" alt="Переключатель" src={checkboxCircle}/>
            </div>
            <p className="checkbox__text">Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox;