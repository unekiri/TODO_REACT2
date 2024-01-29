import React, { useEffect } from 'react';
import { Header} from './Header';
import { MainView } from './MainView';
import { getItems } from './GetItems'; 
import '../stylesheets/style.css';

export const Complete = () => {
  useEffect(() => {
    getItems(true);
  }, []);
  return (
    <>
    <Header />
    <main>
      <div className="container">
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