import React, { useEffect } from 'react';
import { Header }  from './Header';
import { MainView } from './MainView';
import { getItems } from './GetItems';
import '../stylesheets/style.css';

export const Home = () => {
  useEffect(() => {
    getItems(false);
  }, []); // 第二引数が空の場合、初回レンダリング時のみ実行される

  return (
    <>
      <Header />
      <main>
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
          <MainView
            bkcolor="#ffffe0" 
            title="完了一覧"
            content="内容"
            plan="完了日"
          >
          <ul id="complete-list">
          </ul>
          </MainView>
        </div>
      </main>
    </>
  );
};