import React from 'react';
import { AlertContext } from '../context/alert/alertContext';

const useForm = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);
  const alert = React.useContext(AlertContext);

  const submitHandler = event => {
    event.preventDefault();

    if (!value) {
      alert.show('Введите название Айфона');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  return { value, submitHandler, handleChange };
}

export default useForm