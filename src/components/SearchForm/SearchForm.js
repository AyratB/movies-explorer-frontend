import React from "react";
import Button from "./../Button/Button";
import FilterCheckbox from "./../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const SearchForm = (props) => { 

   
    const { values, handleChange, errors, resetForm, setErrors } = useFormWithValidation();    


    const [isFullMoviesChecked, setIsFullMoviesChecked] = React.useState(false);
    const [isSavedMoviesChecked, setIsSavedMoviesChecked] = React.useState(false);

    const [isFirstFullMovieReload, setIsFirstFullMovieReload] = React.useState(true);
    const [isFirstSavedMovieReload, setIsFirstSavedMovieReload] = React.useState(true);

    const [previousFullMoviesSearchValue, setPreviousFullMoviesSearchValue] = React.useState("");
    const [previousSavedMoviesSearchValue, setPreviousSavedMoviesSearchValue] = React.useState("");

    const [previousSearchValue, setPreviousSearchValue] = React.useState("");
    
    
    var vvv = values["search-form-search-value"] || props.previousSearchValue;
    console.log("vv", vvv);

    const searchMovie = (isChecked, isFromCheccking) => {

        if(props.isSavedFilms){
            props.onSubmit({
                searchValue: values["search-form-search-value"],
                isChecked: isChecked
            });

            return;
        }

        let searchValue = values["search-form-search-value"];

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
        searchMovie(props.isSavedFilms ? isSavedMoviesChecked : isFullMoviesChecked, false)         
    }    

    React.useEffect(() => {

        setPreviousFullMoviesSearchValue(props.previousSearchValue);

        return () => {


            resetForm();
        }

    }, [props.isSavedFilms]);    

    const checked = (e) => {

        props.isSavedFilms
            ? setIsSavedMoviesChecked(e)
            : setIsFullMoviesChecked(e);
        
        searchMovie(e, true);
    }

    const handleFormChange = (e) => {

        props.isSavedFilms 
            ? setIsFirstFullMovieReload(true)
            : setIsFirstSavedMovieReload(true);

        setPreviousSearchValue(props.isSavedFilms 
            ? isFirstSavedMovieReload 
                ? props.previousSavedMoviesSearchValue
                : previousSavedMoviesSearchValue
            : isFirstFullMovieReload 
                ? props.previousSearchValue
                : previousFullMoviesSearchValue)
        
        props.deleteEmptySearchResult();        
        
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

                            value={values["search-form-search-value"] || (props.isSavedFilms ? isFirstSavedMovieReload ? props.previousSavedMoviesSearchValue : previousSavedMoviesSearchValue : isFirstFullMovieReload ? props.previousSearchValue : previousFullMoviesSearchValue) ||  ""}/>

                        <span className={`search-form__span-error ${errors["search-form-search-value"] ? "search-form__span-error_active" : ""}`}>
                            {errors["search-form-search-value"]}
                        </span>

                    </section>
                    <Button type="submit" className="button button_type_search-movie">Поиск</Button>
                </div>
            </form>
            <FilterCheckbox checked={checked} isChecked={isFullMoviesChecked} isSavedChecked={isSavedMoviesChecked}/>
        </section>
    );
};

export default SearchForm;