import React from 'react';

export const FormButton = ({ onClose }) => {
  return (
      <div className="end_button">
        <button type="submit">送信</button>
        <button type="button" onClick={onClose}>戻る</button>
      </div>
  );
};
