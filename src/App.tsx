import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreatePost from './pages/Post/CreatePost';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<CreatePost/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Registration/>}></Route>
    </Routes>
    </>
  )
}

export default App
