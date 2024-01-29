import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home }  from './components/Home';
import { Incomplete } from './components/Incomplete';
import { Complete } from './components/Complete';
import { Addtext } from './components/Addtext';
import { IncompleteEdit } from './components/IncompleteEdit';
import { CompleteEdit } from './components/CompleteEdit';
import { IncompleteChange } from './components/IncompleteChange';
import { CompleteChange } from './components/CompleteChange';

import './stylesheets/style.css';

export const  App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/incomplete" element={<Incomplete />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/addtext" element={<Addtext />} />
        <Route path="/incomplete_edit" element={<IncompleteEdit />} />
        <Route path="/complete_edit" element={<CompleteEdit />} />
        <Route path="/incomplete_change" element={<IncompleteChange />} />
        <Route path="/complete_change" element={<CompleteChange />} />
      </Routes> 
    </BrowserRouter>
  );
};