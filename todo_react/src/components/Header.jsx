import React from 'react';
import { Link } from 'react-router-dom';
import top from '../images/top.jpeg';
import '../stylesheets/style.css';

export const Header = () => {
  return (
    <header id="header">
      <h1>
        <Link to="/">
          <img className="top" src={ top } alt="TOPに戻る" />
        </Link>
      </h1>
      <nav>
        <ul className="main-nav">
          <li><Link to="/incomplete">未完了</Link></li>
          <li><Link to="/complete">完了</Link></li>
        </ul>
      </nav>
    </header>
  );
};
