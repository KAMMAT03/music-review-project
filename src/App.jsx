import React from 'react';
import './App.css'
import Login from './pages/Login'
import AlbumPage from './pages/AlbumPage';
import Main from './pages/Main';
import { Routes, Route } from 'react-router-dom';


export default function App(){
  const [token, setToken] = React.useState("");

  function saveToken(text){
    setToken(text);
  }

  return (
    <div className='container'>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/search" element={<Main />} />
        <Route path="/album" element={<AlbumPage />} />
      </Routes>
    </div>
  )
}