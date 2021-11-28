import React, { useCallback } from "react";

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

    if(target.name === "register-form-user-name" && target.validity.patternMismatch){
      setErrors({...errors, "register-form-user-name": "Поле 'Имя' может содержать только латиницу, кириллицу, пробел или дефис" });
    }

    if(target.name === "register-form-user-email" && target.validity.typeMismatch){
      setErrors({...errors, "register-form-user-email": "Поле 'Email' не соответствует шаблону электронной почты" });
    }

    if(target.name === "login-form-user-email" && target.validity.typeMismatch){
      setErrors({...errors, "login-form-user-email": "Поле 'Email' не соответствует шаблону электронной почты" });
    }

    setIsValid(target.closest("form").checkValidity());    
  };

  const customEditFormValidity = (previusName, previusEmail, e) => {
    if (e.target.name === "profile-form-user-name") {
      return e.target.value !== previusName && values["profile-form-user-email"] !== previusEmail;
    } else if (e.target === "profile-form-user-email") {
      return values["profile-form-user-name"] !== previusName && e.target.value !== previusEmail;
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

  return { values, handleChange, errors, isValid, resetForm, setErrors, customEditFormValidity };
}