import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addItem } from './PostItem';
import { FormContents } from './FormContents';
import { FormDate } from './FormDate';
import { FormButton } from './FormButton';
import top from '../images/top.jpeg';
import '../stylesheets/style.css';

const style = {
  // モーダルのスタイル設定
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

export const Header = ({ setShowButtons, setCurrentView }) => {
  const [showForm, setShowForm] = useState(false);
  const { handleSubmit, ...formMethods } = useForm();

  const handleHomeClick = () => {
    setCurrentView("all");
    setShowButtons(false);
  };

  const handleIncompleteClick = () => {
    setShowButtons(true);
    setCurrentView("incomplete");
    setShowForm(false);
  };

  const handleCompleteClick = () => {
    setShowButtons(true);
    setCurrentView("complete");
    setShowForm(false);
  };

  const handleOpen = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleOnSubmit = (data) => {
    addItem(data);
    handleClose();
  };

  return (
    <header id="header">
      <h1>
        <span onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          <img className="top" src={top} alt="TOPに戻る" />
        </span>
      </h1>
      <nav>
        <ul className="main-nav">
          <li><Button onClick={handleIncompleteClick} style={{ cursor: 'pointer' }}>未完了</Button></li>
          <li><Button onClick={handleCompleteClick} style={{ cursor: 'pointer' }}>完了</Button></li>
          <li><Button onClick={handleOpen}>Todo追加</Button></li>
        </ul>
      </nav>
      <Modal
        open={showForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <FormContents formMethods={formMethods}/>
            <FormDate title="完了予定日" formMethods={formMethods}/>
            <FormButton/>
          </form>
        </Box>
      </Modal>
    </header>
  );
};
