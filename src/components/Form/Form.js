import React from "react";
import { FormValidator } from "./../../utils/FormValidator.js";
import { validationConfig } from "./../../utils/validationConfig.js";
import './Form.css';

const Form = (props) => {

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit();
    }

    const [formValidator, setValidator] = React.useState({});

    React.useEffect(() => {
        const searchMovieFormValidator = new FormValidator(
            validationConfig,
            document.forms[props.formName]
        );

        setValidator(Object.assign(formValidator, searchMovieFormValidator));

        searchMovieFormValidator.enableValidation();

        let previousSearch = props.isSavedFilms ? props.previousSavedSearchValue : props.previousSearchValue;

        if (formValidator && !previousSearch) {
            formValidator.makeButtonDisable();
        }

        return () => {
            formValidator.clearAllFormErrors();
            formValidator.makeButtonDisable();
        };
    }, []);

    return (
        <form className="form" name={props.formName} onSubmit={handleSubmit} onClose={props.onClose}>
            {props.children}
        </form>
    );
};

export default Form;