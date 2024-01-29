import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header} from './Header';
import { MainView } from './MainView';
import { getItems } from './GetItems'; 
import '../stylesheets/style.css';

export const Incomplete = () => {
  useEffect(() => {
    getItems(true);
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="add_text">
          <Link to="/addtext">TODOを追加する</Link>
        </div>
        <div className="container">
          <MainView
              bkcolor="#c1ffe2" 
              title="未完了一覧"
              content="内容"
              plan="予定日"
            >
            <ul id="incomplete-list">
            </ul>
          </MainView>
        </div>
      </main>
    </>
  );
};
