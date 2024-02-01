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

export const CustomModal = ({ open, onClose, initialValues, onSubmit, isStatusChangeAction }) => {
  const { handleSubmit, reset, ...formMethods } = useForm({
    defaultValues: initialValues,
  });

  // onSubmit をラップする関数
  const onSubmitWrapper = (data) => onSubmit(data, reset);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmitWrapper)}>
          <FormContents formMethods={formMethods} isStatusChangeAction={isStatusChangeAction} />
          <FormDate title="日付" formMethods={formMethods}/>
          <FormButton />
        </form>
      </Box>
    </Modal>
  );
};
