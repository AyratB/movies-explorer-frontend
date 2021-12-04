import React from "react";
import Button from "./../Button/Button";
import FilterCheckbox from "./../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const SearchForm = (props) => {

    const { values, handleChange, errors, resetForm, setErrors } = useFormWithValidation();
    
    const [isChecked, setIsChecked] = React.useState(false);
    const [firstSearchValue, setFirstSearchValue] = React.useState("");
    
    let prevSearchValue = props.previousSearchValue;

    const searcMovie = (isChecked) => {

        if(props.isSavedFilms){
            props.onSubmit({
                searchValue: values["search-form-search-value"],
                isChecked: isChecked
            });

            return;
        }

        let searchValue = values["search-form-search-value"] || firstSearchValue;

        if(typeof searchValue === "undefined" || searchValue === "" || searchValue.trim() === ""){
            setErrors({...errors, "search-form-search-value": "Нужно ввести ключевое слово" });
            return;
        }

        props.onSubmit({
            searchValue: searchValue,
            isChecked: isChecked
        });
    }

    const searchFormHandleSubmit = (e) => {
        e.preventDefault();
        searcMovie(isChecked);
    }    

    React.useEffect(() => {

     setFirstSearchValue();
     return () => { resetForm(); }
    }, []);

    React.useEffect(() => {
        setFirstSearchValue(typeof prevSearchValue !== "undefined" ? prevSearchValue : "");
        resetForm();        
    }, [props.isSavedFilms]);    

    const checked = (e) => {
        setIsChecked(e);
        searcMovie(e);
    }

    const handleFormChange = (e) => {
        props.deleteEmptySearchResult();
        setFirstSearchValue("");
        handleChange(e);
    }

    return (
        <section className="search-form">
            <form name="search-form" onSubmit={searchFormHandleSubmit} noValidate>
                <div className="search-form__wrapper">
                    <section className="search-form__section">
                        <input
                            type="text"
                            className={`search-form__input ${errors["search-form-search-value"] ? "search-form__input_type_error" : ""}`}
                            name="search-form-search-value"
                            id="search-form-search-value"
                            placeholder="Фильм"
                            onChange={handleFormChange}
                            value={values["search-form-search-value"] || firstSearchValue || ""}/>
                        <span className={`search-form__span-error ${errors["search-form-search-value"] ? "search-form__span-error_active" : ""}`}>
                            {errors["search-form-search-value"]}
                        </span>
                    </section>
                    <Button type="submit" className="button button_type_search-movie">Поиск</Button>
                </div>
            </form>
            <FilterCheckbox checked={checked} isChecked={props.isChecked}/>
        </section>
    );
};

export default SearchForm;