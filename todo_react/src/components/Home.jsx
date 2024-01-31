import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { CustomModal } from './CustomModal';
import { uri } from './ApiUrl';
import '../stylesheets/style.css';

const TodoList = ({ title, showButtons, todos, onEdit, onDelete, onChange }) => {
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
                  <button onClick={() => onChange(item.id)}>変更</button>
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentView, setCurrentView] = useState("all");

  useEffect(() => {
    fetchTodos(currentView);
  }, [currentView]);

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
  
      setTodos(updatedTodos);
      setShowEditModal(false); // モーダルを閉じる
      setCurrentView("all"); // 全体ページに移動
    } catch (error) {
      console.error('Unable to add item.', error);
    }
  };
  
  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };
  
  const editTodo = async (data) => {
    if (editingItem) {
      try {
        const updatedItem = {
          ...editingItem,
          ...data,
          date: new Date(data.date).toISOString(),
        };
  
        await axios.put(`${uri}/${editingItem.id}`, updatedItem);
        
        // 更新されたアイテムでリストを更新
        let updatedTodos = todos.map(item => 
          item.id === editingItem.id
            ? { ...updatedItem, date: new Date(updatedItem.date).toLocaleString("ja-JP", { year: "numeric", month: "numeric", day: "numeric" }) }
            : item
        );
  
        // 更新されたリストを昇順にソート
        updatedTodos = updatedTodos.sort((a, b) => new Date(a.date) - new Date(b.date));
  
        setTodos(updatedTodos);
        setShowEditModal(false);
        setCurrentView("all"); // 未完了画面に移動
      } catch (error) {
        console.error('Unable to update item', error);
      }
    }
  };
  
  const handleChangeClick = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const changeTodo = async (id) => {
    const item = todos.find(item => item.id === id);
    if (item) {
      try {
        const updatedItem = {
          ...item,
          isComplete: !item.isComplete,
          date: new Date(item.date).toISOString()
        };
  
        await axios.put(`${uri}/${id}`, updatedItem);
        fetchTodos(currentView); // 更新後のリストを取得
      } catch (error) {
        console.error('Unable to update item.', error);
      }
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
  

  return (
    <>
      <Header setCurrentView={setCurrentView} setShowButtons={setShowButtons}/>
      <main>
        <div className="container">
          {currentView === "incomplete" && (
            <TodoList 
              title="未完了一覧" 
              showButtons={showButtons} 
              todos={todos.filter(todo => !todo.isComplete)} 
              onEdit={handleEditClick} 
              onDelete={deleteItem}
              onChange={handleChangeClick} // 変更ボタンの処理を追加
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
                onEdit={handleEditClick} 
                onDelete={deleteItem}
                onChange={handleChangeClick} // 変更ボタンの処理を追加
              />
              <TodoList 
                title="完了一覧" 
                showButtons={showButtons} 
                todos={todos.filter(todo => todo.isComplete)} 
                onEdit={handleEditClick} 
                onDelete={deleteItem}
                onChange={handleChangeClick} // 変更ボタンの処理を追加
              />
            </>
          )}
        </div>
      </main>
      {showEditModal && (
        <CustomModal 
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setCurrentView("all"); // HOME画面に移動
          }}
          initialValues={{ 
            name: editingItem?.name, 
            date: editingItem ? new Date(editingItem.date).toISOString().split('T')[0] : ''
          }}
          onSubmit={(data) => editingItem ? editTodo(data) : addTodo(data)} // 編集中のアイテムがある場合は editTodo、そうでなければ addTodo を使用
        />
      )}
    </>
  );
};