// CustomModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const CustomModal = ({ open, onClose, children }) => {

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
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};
