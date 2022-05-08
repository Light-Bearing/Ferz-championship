import React from 'react';
import {Routes, Route, Navigate} from "react-router";
import './App.css';
import RidersList from '../RidersList/RidersList';
import Profile from '../Profile/Profile';
import JudgePage from '../JudgePage/JudgePage';
import ProjectManagerPage from '../ProjectManagerPage/ProjectManagerPage';
import AdminPage from '../AdminPage/AdminPage';
import Login from '../Login/Login';
import MainJudgePage from '../MainJudgePage/MainJudgePage';
import UsersList from "../UserList/UsersList";

function App() {
  return (
      <Routes>
        <Route path='/'  element={<Login />}/>
        <Route path='/riders' element={<RidersList />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/judge' element={<JudgePage />}/>
        <Route path='/main_judge' element={<MainJudgePage />}/>
        <Route path='/pm' element={<ProjectManagerPage />}/>
        <Route path='/admin' element={<AdminPage />}/>
        <Route path='/users' element={<UsersList />}/>
        <Route path='/signin' element={<Login />}/>
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
  )
}

export default App;
