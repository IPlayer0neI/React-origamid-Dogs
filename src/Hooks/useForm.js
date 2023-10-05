import React from "react";

function useForm(){
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function onChange({ target }){
    error && validate(target.value);
    setValue(target.value);
  };

  function validate(value){
    if(value.length == 0){
      setError("Prencha um valor");
      return false;
    };
    setError(true);
    return true;
  };

  return {
    value,
    setValue,
    error,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value)
  }
};

export default useForm;