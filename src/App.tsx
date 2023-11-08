import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreatePost from './pages/Post/CreatePost';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Dashboard from './components/Dashboard';
import PostList from './pages/Post/PostList';

function App() {

  return (
    <>
    <Routes>
      <Route path='/post-create' element={<CreatePost/>}></Route>
      <Route path='/posts' element={<PostList/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Registration/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </>
  )
}

export default App
