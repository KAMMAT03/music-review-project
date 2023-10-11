import React from 'react';
import './App.css'
// import Login from './pages/Login'
import Main from './pages/Main';


export default function App(){
  const [token, setToken] = React.useState("");

  function saveToken(text){
    setToken(text);
  }

  return (
    <div className='container'>
      {/* <Login saveToken={saveToken} /> */}
      <Main token={token} />
    </div>
  )
}