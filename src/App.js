
import './App.css';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Home from './components/Home';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Notestate from './components/Context/Notestate';


const App = () => {

  return (
    <>
      <Notestate>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/Home' element={<Home />}></Route>
            <Route exact path='/Form' element={<Form />}></Route>
          </Routes>
        </BrowserRouter>
      </Notestate>
    </>
  );
};

// If the `str` contains more `a` than `b` / there are unmatched pairs, the first match that was closed will be used. For example, `{{ '{{a' | escape }}` will match `['{', 'a', '']` and `{{ '{a}}' | escape }}` will match `['', 'a', '}']`.


export default App;
