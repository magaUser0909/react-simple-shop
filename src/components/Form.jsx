import React from 'react';
import useForm from '../hooks/useForm';

export const Form = () => {
  const { value, submitHandler, handleChange } = useForm("");

  return (
    <form onSubmit={submitHandler}>
      <div className='form-group'>
        <input
          type="text"
          className="form-control"
          placeholder='Поиск'
          value={value}
          onChange={handleChange} />
      </div>
    </form>
  );
};
