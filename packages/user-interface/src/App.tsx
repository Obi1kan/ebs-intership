import React, { createContext, useState, useContext } from 'react';
import Login from './pages/login'
import  Register  from './pages/register';
import Homepage from './pages/homepage';
import {Routes, Route} from 'react-router-dom';
import { UserContext } from './context/myContext';

function App() {
  const {isAuth, setIsAuth} = useContext(UserContext)
  console.log(isAuth)
  if (!isAuth)
    return (
      <div className="container">
        <Routes>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path='/register' element = {<Register/>} ></Route>
        </Routes>
      </div>
    );
  else
      return (
        <div className="container">
          <Routes>
            <Route path = '/' element = {<Homepage/>}></Route>
          </Routes>
        </div>
      )
}

export default App;
