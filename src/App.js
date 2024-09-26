// import './App.css';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import './index.css';
import {Provider} from 'react-redux'
import UserReducer from './UserReducer';
import Main from './Main';
import Create from './Create';
import { BrowserRouter as router ,Route, Routes } from 'react-router-dom';
import Update from './Update';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  
const store = configureStore({
  reducer: {
    users: UserReducer
  }
})

  return (
    <div>
   <Provider store={store}>
   <div >
       <div className='navbar'>
        .
        </div>
        <div className='sidebar'>

        </div>
        <div className='major-part'>
       <Routes>
       <Route path="/" element={<Login />} /> 
       <Route path="/signup" element={<Signup/>} /> 
        <Route path='/main' element={<Main />}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/edit/:id' element={<Update/>}></Route>
       </Routes>
       </div>
     
    </div>
    </Provider>
    </div>
  );
}

export default App;
