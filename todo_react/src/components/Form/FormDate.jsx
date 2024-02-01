import React from 'react';

export const FormDate = ({ title, formMethods }) => {
  const { register, formState: { errors } } = formMethods;

  return (
      <div className="another-page">
        <p className="form">{title}</p>
        <input 
          id="date" type="date" 
          {...register('date', {  // フィールドの名前（キー）とユーザーが入力または選択した値が内部的に関連付けられ、フォーム送信時にその情報が収集される
              required: '入力必須です。' }
          )}
        />
        {errors && errors.date && <span className="error-message">{errors.date.message}</span>}
      </div>
  );
};
