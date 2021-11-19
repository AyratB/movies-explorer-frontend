import React, { useCallback } from "react";
const validator = require('validator');

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if(target.name === "register-form-user-name"){
      additionalRegisterFormNameValidity(target);
    }
    if(target.name === "register-form-user-email"){
      additionalRegisterFormEmailValidity(target);
    }

    // if(target.name === "search-form-search-value"){
    //   additionalSearchFormValidity(target);
    // }
  };

  const additionalSearchFormValidity = (target) => {
    if(target.validity.tooShort){
      setErrors({...errors, [target.name]: "Нужно ввести ключевое слово" });
      setIsValid(false);
    }
  }

  const additionalRegisterFormNameValidity = (target) => {
    if(!(/[а-яa-z\sё -]/gi.test(target.value) && !(/\d/gi.test(target.value)))){
      setErrors({...errors, [target.name]: "Имя пользователя может содержать только латиницу, кириллицу, пробел или дефис" });
      setIsValid(false);
    }
  }

  const additionalRegisterFormEmailValidity = (target) => {
    if(!validator.isEmail(target.value)){
      setErrors({...errors, [target.name]: "Поле 'Email' не соответствует шаблону электронной почты" });
      setIsValid(false);
    }
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setErrors };
}