import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { addItem } from './PostItem';
import { FormContents } from './atom/FormContents';
import { FormDate } from './atom/FormDate';
import { FormButton } from './atom/FormButton';
import { CustomModal } from './CustomModal';
import '../stylesheets/style.css';
import top from '../images/top.jpeg';
import axios from 'axios';
import { uri } from './ApiUrl';

export const Header = ({ setCurrentView, setShowButtons, setTodos }) => {
  const [showForm, setShowForm] = useState(false); // モーダルの表示状態
  const { handleSubmit, ...formMethods } = useForm();

  
  const handleHomeClick = () => {
    setCurrentView("all");
    setShowButtons(false);
  };
  
  const handleIncompleteClick = () => {
    setShowButtons(true);
    setCurrentView("incomplete");
    fetchTodos("incomplete"); // 未完了のデータを取得
  };
  
  const handleCompleteClick = () => {
    setShowButtons(true);
    setCurrentView("complete");
    fetchTodos("complete"); // 完了のデータを取得
  };
  
  const handleOnSubmit = (data) => {
    addItem(data);
    setShowForm(false); // モーダルを閉じる
  };

  const fetchTodos = async (status) => {
    try {
      const response = await axios.get(`${uri}?status=${status}`);
      const formattedTodos = response.data.map(item => {
        if (item.name.length >= 50) {
          item.name = item.name.match(/.{1,50}/g).join('\n');
        }
        item.date = new Date(item.date).toLocaleString("ja-JP", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        return item;
      });
      // ... 加工後のデータをStateに設定 ...
      setTodos(formattedTodos);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
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
      <CustomModal open={showForm} onClose={() => setShowForm(false)}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <FormContents formMethods={formMethods} />
          <FormDate title="完了予定日" formMethods={formMethods} />
          <FormButton />
        </form>
      </CustomModal>
    </header>
  );
};
