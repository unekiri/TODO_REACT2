import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { CustomModal } from './CustomModal';
import '../stylesheets/style.css';

// APIのURI
export const uri = process.env.REACT_APP_API_URL;

const TodoList = ({ todos, title, showButtons, onEdit, onDelete, onChange }) => {
  return (
    <div className={`area ${title === "未完了一覧" ? "unfinished" : "completed"}`}>
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
                  <button onClick={() => onDelete(item.id)}>削除</button>
                  <button onClick={() => onChange(item)}>変更</button>
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
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState("all");

  useEffect(() => {
    fetchTodos(currentView);
  }, [currentView]); //初期状態

  const fetchTodos = async (status) => {
    try {
      const query = status !== "all" ? `?status=${status}` : "";
      const response = await axios.get(`${uri}${query}`);
      const sortedData = response.data
        .map(item => ({
          ...item,
          date: new Date(item.date).toLocaleString("ja-JP", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
  
      setTodos(sortedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  const addTodo = async (data) => {
    try {
      const response = await axios.post(uri, {
        ...data,
        isComplete: false,
        date: new Date(data.date).toISOString()
      });
      
      // 新しいTODOをリストに追加
      const updatedTodos = [
        ...todos,
        {
          ...response.data,
          date: new Date(response.data.date).toLocaleString("ja-JP", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }
      ];
  
      setTodos(updatedTodos.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (error) {
      console.error('Unable to add item.', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem({ ...item, isStatusChangeAction: false });
    setShowModal(true);
  };
  
  const handleChangeClick = (item) => {
    setEditingItem({ ...item, isStatusChangeAction: true });
    setShowModal(true);
  };

  const updateTodo = async (data, id, isStatusChange) => {
    try {
      let updatedItem;
      if (isStatusChange) {
        // 状態変更の場合
        updatedItem = {
          ...editingItem,
          ...data,
          date: new Date(data.date).toISOString(),          
          isComplete: !editingItem.isComplete
        };
      } else {
        // その他の編集の場合
        updatedItem = {
          ...editingItem,
          ...data,
          date: new Date(data.date).toISOString(),
        };
      }
  
      await axios.put(`${uri}/${id}`, updatedItem);
  
      // 更新されたアイテムでリストを更新
      const updatedTodos = todos.map(item =>
        item.id === id
          ? { ...updatedItem, date: new Date(updatedItem.date).toLocaleString("ja-JP", { year: "numeric", month: "numeric", day: "numeric" }) }
          : item
      );
  
      // 更新されたリストを昇順にソート
      setTodos(updatedTodos.sort((a, b) => new Date(a.date) - new Date(b.date)));
      setShowModal(false);
    } catch (error) {
      console.error('Unable to update item', error);
    }
  };  
  

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${uri}/${id}`);
      // 削除に成功したら、リストから該当するアイテムを削除
      const updatedTodos = todos.filter(item => item.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Unable to delete item.', error);
    }
  };

  const handleModalSubmit = async (data) => {
    updateTodo(data, editingItem.id, editingItem.isStatusChangeAction);
  } 

  return (
    <>
      <Header addTodo={addTodo} setCurrentView={setCurrentView} setShowButtons={setShowButtons}/>
      <main>
        <div className="container">
          {currentView === "incomplete" && (
            <TodoList 
              title="未完了一覧" 
              showButtons={showButtons} 
              todos={todos.filter(todo => !todo.isComplete)} 
              onEdit={handleEditClick} 
              onDelete={deleteItem}
              onChange={handleChangeClick}
            />
          )}
          {currentView === "complete" && (
            <TodoList 
              title="完了一覧" 
              showButtons={showButtons} 
              todos={todos.filter(todo => todo.isComplete)} 
              onEdit={handleEditClick} 
              onDelete={deleteItem}
              onChange={handleChangeClick}
            />
          )}
          {currentView === "all" && (
            <>
              <TodoList 
                title="未完了一覧" 
                showButtons={showButtons} 
                todos={todos.filter(todo => !todo.isComplete)} 
              />
              <TodoList 
                title="完了一覧" 
                showButtons={showButtons} 
                todos={todos.filter(todo => todo.isComplete)} 
              />
            </>
          )}
        </div>
      </main>
      {showModal && (
        <CustomModal 
        open={showModal}
        onClose={() => setShowModal(false)}
        initialValues={{
          name: editingItem ? editingItem.name : '', 
          date: editingItem ? new Date(editingItem.date + 'Z').toISOString().split('T')[0] : '' // UTC 日付をローカルタイムゾーンに変換
        }}
        isStatusChangeAction={editingItem ? editingItem.isStatusChangeAction : false}
        onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
};