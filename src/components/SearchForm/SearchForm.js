import React from "react";
import Button from "./../Button/Button";
import FilterCheckbox from "./../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const SearchForm = (props) => {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    let prevSearchValue = props.isSavedFilms ? props.previousSavedSearchValue : props.previousSearchValue;

    const [firstSearchValue, setFirstSearchValue] = React.useState("");

    function searchFormHandleSubmit(e) {

        debugger;

        // TODO поиск по всем фильмам или по сохраненным

        e.preventDefault();
        props.onSubmit({
            searchValue: values["search-form-search-value"] || firstSearchValue,            
            isChecked: isChecked
        });
    }    

    React.useEffect(() => {
     
     setFirstSearchValue();
     return () => {
            resetForm();
        }
    }, []);

    React.useEffect(() => {
        setFirstSearchValue(typeof prevSearchValue !== "undefined" ? prevSearchValue : "");
        resetForm();        
    }, [props.isSavedFilms]);

    const [isChecked, setIsChecked] = React.useState(false);

    const checked = (e) => {
        setIsChecked(e);
    }

    const handleFormChange = (e) => {
        props.deleteEmptySearchResult();
        setFirstSearchValue("");
        handleChange(e);
    }

    return (
        <section className="search-form">
            <form name="search-form" onSubmit={searchFormHandleSubmit}>
                <div className="search-form__wrapper">
                    <section className="search-form__section">
                        <input
                            type="text"
                            className={`search-form__input ${errors["search-form-search-value"] ? "search-form__input_type_error" : ""}`}
                            name="search-form-search-value"
                            id="search-form-search-value"
                            placeholder="Фильм" 
                            required
                            minLength="2"
                            maxLength="40"
                            onChange={handleFormChange}
                            value={values["search-form-search-value"] || firstSearchValue || ""}/>
                        <span className={`search-form__span-error ${errors["search-form-search-value"] ? "search-form__span-error_active" : ""}`}>
                            {errors["search-form-search-value"]}
                        </span>
                    </section>
                    <Button 
                        type="submit" 
                        className={`button button_type_search-movie ${(isValid || firstSearchValue !=="") ? "" : "button_inactive"}`}
                        disabled={!(isValid || firstSearchValue !=="")}>
                            Поиск
                    </Button>
                </div>
            </form>
            <FilterCheckbox checked={checked}/>
        </section>
    );
};

export default SearchForm;