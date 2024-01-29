import React from 'react';

export const FormDate = ({ title, formMethods }) => {
  const { register, formState: { errors } } = formMethods;

  return (
      <div className="another-page">
        <p className="form">{title}</p>
        <input 
          id="date" type="date" 
          {...register('date', { 
              required: '入力必須です。' }
          )}
        />
        {errors.date && <span className="error-message">{errors.date.message}</span>}
      </div>
  );
};
