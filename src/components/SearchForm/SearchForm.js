import React from "react";
import Button from "./../Button/Button";
import Form from "./../Form/Form";
import FilterCheckbox from "./../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

import { useForm } from "./../../hooks/useForm";

const SearchForm = (props) => {

    const { values, handleChange, setValues, clearInputValues } = useForm();

    function handleSubmit() {
        
        props.onSubmit({
            searchValue: values["search-form-name"] || (props.isSavedFilms ? props.previousSavedSearchValue : props.previousSearchValue),
            formCleaner: clearInputValues,
            isChecked: isChecked
        });
    }

    const [isChecked, setIsChecked] = React.useState(false);

    React.useEffect(() => {
        setValues({
            "search-form-name": "",
          });
    }, [props.isSavedFilms]);

    const checked = (e) => {
        setIsChecked(e);
    }

    return (
        <section className="search-form">
            <Form formName="search-form" onSubmit={handleSubmit} previousSearchValue={props.isSavedFilms ? props.previousSavedSearchValue : props.previousSearchValue} isSavedFilms={props.isSavedFilms}>

                <div className="search-form__wrapper">
                    <section className="form__section">
                        <input
                            type="text"
                            className="form__input search-form__input"
                            name="search-form-name"
                            id="search-form-name"
                            placeholder="Фильм" 
                            required
                            minLength="2"
                            maxLength="40"
                            onChange={handleChange}
                            value={values["search-form-name"] || props.isSavedFilms ? props.previousSavedSearchValue : props.previousSearchValue || ""}/>
                        <span className="form__span-error" id="search-form-name-error"></span>
                    </section>

                    <Button type="submit" className="button button_type_save-form search-form_save-form">Поиск</Button>
                </div>
            </Form>
            <FilterCheckbox checked={checked}/>
        </section>
    );
};

export default SearchForm;