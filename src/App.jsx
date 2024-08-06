import React from 'react';
import LoginForm from './component/LoginForm';
import NavBar from './component/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './component/UserList';
import Update from './component/Update';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/user-list" element={<UserList />} />
          <Route exact path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App