import React from "react";

export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
  };

  const clearInputValues = () => setValues({});

  return { values, handleChange, setValues, clearInputValues };
}