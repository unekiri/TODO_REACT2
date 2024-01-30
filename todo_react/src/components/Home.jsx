import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { MainView } from './MainView';
import { editItem } from './EditItems';
import { deleteItem } from './DeleteItem';
import { changeItem } from './ChangeItem';
import axios from 'axios';
import { uri } from './ApiUrl';
import '../stylesheets/style.css';

const TodoList = ({ title, showButtons, todos }) => {
  return (
    <MainView
      bkcolor={title === "未完了一覧" ? "#c1ffe2" : "#ffffe0"}
      title={title}
      content="内容"
      plan={title === "未完了一覧" ? "予定日" : "完了日"}
    >
      <ul id={title === "未完了一覧" ? "incomplete-list" : "complete-list"}>
        {todos.map(item => (
          <div key={item.id} className="list-row">
            <li>{item.name}</li>
            <div className="item-area">
              <span className="detail-plan">{item.date}</span>
              {showButtons && (
                <>
                  <button onClick={() => editItem(item.id, todos)}>編集</button>
                  <button onClick={() => deleteItem(item.id, item.isComplete)}>削除</button>
                  <button onClick={() => changeItem(item.id, todos)}> 
                    {item.isComplete ? '未完了へ変更' : '完了へ変更'}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </ul>
    </MainView>
  );
};

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showButtons, setShowButtons] = useState(false); // 初期値をfalseに設定
  const [currentView, setCurrentView] = useState("all");

  useEffect(() => {
    getItems(); // 初期値はfalseのまま
  }, []);

  const getItems = () => {
    axios.get(uri)
      .then(response => {
        _displayItems(response.data, showButtons);
        setTodos(response.data); // データをStateに設定
      })
      .catch(error => console.error('Unable to get items.', error));
  }

  const _displayItems = (data, showButtons) => {
    // ここでDOM操作を行う必要はないので、データの整形のみ行う
    const formattedTodos = data.map(item => {
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

    setTodos(formattedTodos); // データをStateに設定
  }
  return (
    <>
      <Header setShowButtons={setShowButtons} setCurrentView={setCurrentView} />
      <main>
        <div className="container">
          {currentView === "incomplete" && (
            <TodoList title="未完了一覧" showButtons={showButtons} todos={todos.filter(todo => !todo.isComplete)} />
          )}
          {currentView === "complete" && (
            <TodoList title="完了一覧" showButtons={showButtons} todos={todos.filter(todo => todo.isComplete)} />
          )}
          {currentView === "all" && (
            <>
              <TodoList title="未完了一覧" showButtons={showButtons} todos={todos.filter(todo => !todo.isComplete)} />
              <TodoList title="完了一覧" showButtons={showButtons} todos={todos.filter(todo => todo.isComplete)} />
            </>
          )}
        </div>
      </main>
    </>
  );
};
