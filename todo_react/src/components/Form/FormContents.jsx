import React from 'react';
// MUIのTextFieldコンポーネントをインポート
import TextField from '@mui/material/TextField';

export const FormContents = ({ formMethods, isStatusChangeAction }) => {
  const { register, formState: { errors } } = formMethods;

  return (
    <div className="another-page">
      <p className="form">タスクの内容</p>
      {/* MUIのTextFieldを使用 */}
      <TextField
        id="name"
        placeholder="100文字以内の入力"
        multiline // 複数行の入力を可能にする
        maxRows={4} // 最大表示行数
        variant="outlined" // スタイルバリアント
        {...register('name', {
          required: '入力必須です。',
          maxLength: { value: 100, message: '100文字以内で入力して下さい。' }
        })}
        error={Boolean(errors.name)} // エラー状態の制御
        helperText={errors.name ? errors.name.message : ''} // エラーメッセージの表示
        disabled={isStatusChangeAction}
      />
    </div>
  );
};
