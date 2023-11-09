import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreatePost from './pages/Post/CreatePost';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Dashboard from './components/Dashboard';
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import Navbar from './components/Navbar';
import EditPost from './pages/Post/EditPost';

function App() {

  return (
    <>
    <Routes>
      <Route path='/post-create' element={<CreatePost/>}></Route>
      <Route path='/posts' element={<PostList/>}></Route>
      <Route path='/post-view/:id' element={<PostDetail/>}></Route>
      <Route path='/post-edit/:id' element={<EditPost/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Registration/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/navbar' element={<Navbar/>}></Route>
    </Routes>
    </>
  )
}

export default App
