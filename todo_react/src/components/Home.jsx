import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { uri } from './ApiUrl';
import { CustomModal } from './CustomModal';
import '../stylesheets/style.css';

const TodoList = ({ title, showButtons, todos, onEdit }) => {
  return (
    <div
      className={`area ${title === "未完了一覧" ? "unfinished" : "completed"}`}
    >
      <p className="title">{title}</p>
      <ul id={title === "未完了一覧" ? "incomplete-list" : "complete-list"}>
        {todos.map(item => (
          <div key={item.id} className="list-row">
            <li>{item.name}</li>
            <div className="item-area">
              <span className="detail-plan">{item.date}</span>
              {showButtons && (
                <>
                  <button onClick={() => onEdit(item)}>編集</button>
                  {/* deleteItem と changeItem の実装は省略 */}
                </>
              )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [currentView, setCurrentView] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios.get(uri)
      .then(response => {
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
      })
      .catch(error => console.error('Unable to get items.', error));
  }, []);

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  return (
    <>
      <Header 
        setCurrentView={setCurrentView}
        setShowButtons={setShowButtons}
        setTodos={setTodos} // Header に setTodos を渡す
      />
      <main>
        <div className="container">
          {currentView === "incomplete" && (
            <TodoList title="未完了一覧" showButtons={showButtons} todos={todos.filter(todo => !todo.isComplete)} onEdit={handleEditClick} />
          )}
          {currentView === "complete" && (
            <TodoList title="完了一覧" showButtons={showButtons} todos={todos.filter(todo => todo.isComplete)} onEdit={handleEditClick} />
          )}
          {currentView === "all" && (
            <>
              <TodoList title="未完了一覧" showButtons={showButtons} todos={todos.filter(todo => !todo.isComplete)} onEdit={handleEditClick} />
              <TodoList title="完了一覧" showButtons={showButtons} todos={todos.filter(todo => todo.isComplete)} onEdit={handleEditClick} />
            </>
          )}
        </div>
      </main>
      {/* モーダルの表示 */}
      {showEditModal && (
        <CustomModal item={editingItem} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
};
