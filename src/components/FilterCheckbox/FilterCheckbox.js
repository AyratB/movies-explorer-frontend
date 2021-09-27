import React from "react";

import './FilterCheckbox.css';
import checkboxCircle from "./../../images/checkbox-circle.svg";

const FilterCheckbox = (props) => { 
    
    const [checkedCounter, increaseCheckedCounter] = React.useState(0);

    const handleClick = () => {
        let counter = checkedCounter + 1;
        increaseCheckedCounter(counter);
    }

    return (
        <div className="checkbox__wrapper" onClick={handleClick}>
            <div className={`checkbox__body ${checkedCounter%2 === 0 ? "" : "checkbox__body_type_reverse"}`}>            
                <img className="checkbox__checker" alt="Переключатель" src={checkboxCircle}/>
            </div>
            <p className="checkbox__text">Короткометражки</p>
        </div>               
    );
};

export default FilterCheckbox;