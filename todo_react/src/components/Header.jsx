import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CustomModal } from './CustomModal';
import '../stylesheets/style.css';
import top from '../images/top.jpeg';

export const Header = ({ addTodo, setCurrentView, setShowButtons }) => {
  const [showModal, setShowModal] = useState(false); // モーダルの表示状態

  const handleHomeClick = () => {
    setCurrentView("all");
    setShowButtons(false);
  };

  const handleIncompleteClick = () => {
    setCurrentView("incomplete");
    setShowButtons(true);
  };

  const handleCompleteClick = () => {
    setCurrentView("complete");
    setShowButtons(true);
  };

  const handleModalSubmit = async (data, reset) => {
    await addTodo(data);
    reset(); // フォームのフィールドを初期値にリセット
    setShowModal(false); // モーダルを閉じる
  }

  return (
    <header id="header">
      <h1>
        <span onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          <img className="top" src={top} alt="TOPに戻る" />
        </span>
      </h1>
      <nav>
        <ul className="main-nav">
          <li><Button onClick={handleIncompleteClick}>未完了</Button></li>
          <li><Button onClick={handleCompleteClick}>完了</Button></li>
          <li><Button onClick={() => setShowModal(true)}>Todo追加</Button></li>
        </ul>
      </nav>
      <CustomModal open={showModal} onClose={() => setShowModal(false)} initialValues={{}} onSubmit={handleModalSubmit}/>
    </header>
  );
};
