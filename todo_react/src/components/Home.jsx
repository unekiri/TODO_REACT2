import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { CustomModal } from './CustomModal';
import '../stylesheets/style.css';

// APIのURI
export const uri = process.env.REACT_APP_API_URL;

const TodoList = ({ todos, title, showButtons, buttonText, onEdit, onDelete, onChange }) => {
  return (
    <div className={`area ${title === "未完了一覧" ? "incomplete" : "complete"}`}>
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
                  <button onClick={() => onChange(item)}>{buttonText}</button>
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

  useEffect(() => { // 特定の副作用がいつ再実行されるかをReactに指示するために使用される
    fetchTodos(currentView);
  }, [currentView]);

  const fetchTodos = async (status) => {
    try {
      const query = status !== "all" ? `?status=${status}` : "";
      const response = await axios.get(`${uri}/${query}`);
      const sortedData = response.data //オブジェクトを要素に持つ配列
        .map(item => ({
          ...item, //オブジェクトの各プロパティを新しいオブジェクトにコピーし、追加のプロパティ（変換された date プロパティ）をそのオブジェクトに追加
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
        date: new Date(data.date).toISOString() // バックエンドシステムが解釈しやすい標準化された形式に変換
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
    setEditingItem({ ...item, isStatusChange: false });
    setShowModal(true);
  };
  
  const handleChangeClick = (item) => {
    setEditingItem({ ...item, isStatusChange: true });
    setShowModal(true);
  };

  const updateTodo = async (data, id, isStatusChange) => {
    try {
      // 状態変更の場合とその他の編集の場合で処理を分ける
      const updatedItemBase = {
        ...editingItem,
        ...data,
        date: new Date(data.date).toISOString(),
      };
      
      let updatedItem;
      if (isStatusChange) {
        // 状態変更の場合、isCompleteの値を反転させる
        updatedItem = {
          ...updatedItemBase,
          isComplete: !editingItem.isComplete
        };
      } else {
        // その他の編集の場合、基本のオブジェクトをそのまま使用
        updatedItem = updatedItemBase;
      }
  
      // 更新処理を実行
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
    updateTodo(data, editingItem.id, editingItem.isStatusChange);
  }

  return (
    <>
      <Header addTodo={addTodo} setCurrentView={setCurrentView} setShowButtons={setShowButtons}/>
      <main>
        <div className="container">
          {currentView === "incomplete" && (
            <TodoList 
              title="未完了一覧" 
              buttonText="完了に変更"
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
              buttonText="未完了に戻す"
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
                buttonText="完了に変更"
                showButtons={showButtons} 
                todos={todos.filter(todo => !todo.isComplete)} 
              />
              <TodoList 
                title="完了一覧"
                buttonText="未完了に戻す"
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
          name: editingItem.name, 
          date: new Date(editingItem.date + 'Z').toISOString().split('T')[0]
        }}
        isStatusChange={editingItem.isStatusChange}
        title={
          editingItem.isStatusChange
            ? (editingItem.isComplete ? '完了予定日' : '完了日')
            : (editingItem.isComplete ? '完了日' : '完了予定日') // 編集ボタンが押された時
        }
        onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
};