import React from 'react';
import Login from './pages/login'
import  Register  from './pages/register';
import {Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/register' element = {<Register/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
