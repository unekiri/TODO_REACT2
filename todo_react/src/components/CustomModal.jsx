import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { FormContents } from './Form/FormContents';
import { FormDate } from './Form/FormDate';
import { FormButton } from './Form/FormButton';

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

export const CustomModal = ({ open, onClose, initialValues, title, onSubmit, isStatusChangeAction }) => {
  const { handleSubmit, reset, ...formMethods } = useForm({
    defaultValues: initialValues,
  });

  // onSubmit をラップする関数
  const onSubmitWrapper = (data) => onSubmit(data, reset); // register関数を使ってフォームの各フィールドを登録し、handleSubmit関数を使って処理する際に、それらのフィールドのデータを自動的に収集してdataオブジェクトとして提供

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmitWrapper)}>
          <FormContents formMethods={formMethods} isStatusChangeAction={isStatusChangeAction} />
          <FormDate title={title} formMethods={formMethods}/>
          <FormButton onClose={onClose}/>
        </form>
      </Box>
    </Modal>
  );
};
