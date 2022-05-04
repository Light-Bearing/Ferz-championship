import React, {Component} from 'react';
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
        <Route path='/' exact={true} element={<Login />}/>
        <Route path='/riders' exact={true} element={<RidersList />}/>
        <Route path='/profile' exact={true} element={<Profile />}/>
        <Route path='/judge' exact={true} element={<JudgePage />}/>
        <Route path='/main_judge' exact={true} element={<MainJudgePage />}/>
        <Route path='/pm' exact={true} element={<ProjectManagerPage />}/>
        <Route path='/admin' exact={true} element={<AdminPage />}/>
        <Route path='/users' exact={true} element={<UsersList />}/>
        <Route path='/signin' exact={true} element={<Login />}/>
        <Route path='*' element={<Navigate to={'/'} />} />


      </Routes>
  )
}

export default App;
