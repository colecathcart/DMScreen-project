import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./pages/Login"
import Screen from "./pages/Screen"

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/screen" element={<Screen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
