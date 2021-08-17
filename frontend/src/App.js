import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import RidersList from './app/components/RidersList';
import Profile from './app/components/Profile';
import JudgePage from './app/components/JudgePage';
import ProjectManagerPage from './app/components/ProjectManagerPage';
import AdminPage from './app/components/AdminPage';
import Login from './app/components/Login';
import MainJudgePage from './app/components/MainJudgePage';
import UsersList from "./app/components/UsersList";


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Login}/>
          <Route path='/riders' exact={true} component={RidersList}/>
          <Route path='/profile' exact={true} component={Profile}/>
          <Route path='/judge' exact={true} component={JudgePage}/>
          <Route path='/main_judge' exact={true} component={MainJudgePage}/>
          <Route path='/pm' exact={true} component={ProjectManagerPage}/>
          <Route path='/admin' exact={true} component={AdminPage}/>
          <Route path='/users' exact={true} component={UsersList}/>
          <Route path='/signin' exact={true} component={Login}/>
        </Switch>
      </Router>
    )
  }
}

export default App;