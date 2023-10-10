import React from 'react';
import './App.css'
import Login from './pages/Login'


export default function App(){
  const [token, setToken] = React.useState("");

  function saveToken(text){
    setToken(text);
  }

  return (
    <div className='container'>
      <Login saveToken={saveToken} />
    </div>
  )
}