import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CustomModal } from './CustomModal';
import '../stylesheets/style.css';
import top from '../images/top.jpeg';

export const Header = ({ setCurrentView, setShowButtons }) => {
  const [showForm, setShowForm] = useState(false); // モーダルの表示状態

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
          <li><Button onClick={() => setShowForm(true)}>Todo追加</Button></li>
        </ul>
      </nav>
      <CustomModal open={showForm} onClose={() => setShowForm(false)} initialValues={{}} />
    </header>
  );
};
