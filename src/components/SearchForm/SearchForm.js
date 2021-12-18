import React from "react";
import Button from "./../Button/Button";
import FilterCheckbox from "./../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const SearchForm = (props) => {
   
    const { values, handleChange, errors, resetForm, setErrors } = useFormWithValidation();    

    const [isFirstPageLoad, setIsFirstPageLoad] = React.useState(true);
    const [firtsSearchValue, setFirtsSearchValue] = React.useState("");

    const searchMovie = (isChecked) => {

        let searchValue = isFirstPageLoad ? firtsSearchValue : values["search-form-search-value"];

        if(!props.movieObject["isSavedMovies"] && (typeof searchValue === "undefined" || searchValue === "" || searchValue.trim() === "")){
            setErrors({...errors, "search-form-search-value": "Нужно ввести ключевое слово" });
            return;
        }

        props.onSubmit({
            searchValue: searchValue,
            isChecked: isChecked
        });
    } 
    
    React.useEffect(() => {
        if(props.movieObject["previousSearchValue"] !== ""){
            setFirtsSearchValue(props.movieObject["previousSearchValue"]);
        }        
    }, [props.movieObject["previousSearchValue"]]);

    React.useEffect(() => {
        return () => {
            setFirtsSearchValue("");
            resetForm();}
    }, [props.movieObject]);

    const handleFormChange = (e) => {   
        
        setFirtsSearchValue("");
        setIsFirstPageLoad(false);
        props.deleteEmptySearchResult();
        handleChange(e);
    }

    const searchFormHandleSubmit = (e) => {
        e.preventDefault();
        searchMovie(props.movieObject["shortChecked"]);
    }

    //отдельный поиск по клику по Короткометражке
    const checked = (e) => searchMovie(e);

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

                            // value={values["search-form-search-value"]}/>

                            value={ isFirstPageLoad ? firtsSearchValue : values["search-form-search-value"]}/>

                        <span className={`search-form__span-error ${errors["search-form-search-value"] ? "search-form__span-error_active" : ""}`}>
                            {errors["search-form-search-value"]}
                        </span>

                    </section>
                    <Button type="submit" className="button button_type_search-movie">Поиск</Button>
                </div>
            </form>
            <FilterCheckbox checked={checked} movieObject ={props.movieObject}/>
        </section>
    );
};

export default SearchForm;