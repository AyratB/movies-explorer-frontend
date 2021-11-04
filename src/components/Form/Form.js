import React from "react";
import { FormValidator } from "./../../utils/FormValidator.js";
import { validationConfig } from "./../../utils/validationConfig.js";
import './Form.css';

const Form = (props) => {

    function handleSubmit(e) {
        e.preventDefault();
    
        props.onSubmit();

        // if (formValidator) {
        //     formValidator.clearAllFormErrors();
        //     formValidator.makeButtonDisable();
        //   }

        //   clearInputValues();
    }
    
    // настройка валидации
    const [formValidator, setValidator] = React.useState({});
    
    React.useEffect(() => {
        const searchMovieFormValidator = new FormValidator(
            validationConfig,
            document.forms[props.formName]
        );
    
        setValidator(Object.assign(formValidator, searchMovieFormValidator));
    
        searchMovieFormValidator.enableValidation();

        if (formValidator) {
            formValidator.makeButtonDisable();
        } 
    }, []);
    // настройка валидации

    return (
        <form className="form" name={props.formName} onSubmit={handleSubmit}>
            {props.children}
        </form>
    );
};

export default Form;