// CustomModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { FormContents } from './atom/FormContents';
import { FormDate } from './atom/FormDate';
import { FormButton } from './atom/FormButton';
import axios from 'axios';
import { uri } from './ApiUrl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CustomModal = ({ open, onClose, initialValues, onSubmitSuccess }) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: initialValues,
  });

  // 送信処理
  const onSubmit = async (data) => {
    try {
      await axios.post(uri, {
        ...data,
        isComplete: false,
        date: new Date(data.date).toISOString()
      });
      onClose(); // モーダルを閉じる
    } catch (error) {
      console.error('Unable to add item.', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register('name') と register('date') の戻り値を直接コンポーネントに渡します */}
          <FormContents register={register} errors={errors} />
          <FormDate title="完了予定日" register={register} errors={errors} />
          <FormButton />
        </form>
      </Box>
    </Modal>
  );
};
