import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Redirect, Route } from 'react-router-dom';

import Auth from './modules/Auth';
import AdminAuth from './modules/Auth';

import DashNav from './components/DashNav.jsx';
import Nav from './components/Nav';
import Login from './components/Login.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import IntervisitationQuestionnaire from './components/IntervisitationQuestionnaire.jsx';
import Questionnaire from './components/Questionnaire.jsx';
import SchoolData from './components/SchoolData';
import Results from './components/Results.jsx';
import FilteredResults from './components/Admin/FilteredResults';
import Controller from './components/Admin/Controller.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: Auth.isUserAuthenticated(),
      adminAuth: AdminAuth.isUserAuthenticated(),
      username: '',
      password: '',
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAdminLoginSubmit = this.handleAdminLoginSubmit.bind(this);
    this.handleAdminLogout = this.handleAdminLogout.bind(this);
  }

    handleChange(e) {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
          [name]: val,
        });
        console.log(val)
    }

    handleLoginSubmit(e, data){
      e.preventDefault();
      console.log(data);
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.token) {
            Auth.authenticateToken(res.token);
            this.setState({
              auth: Auth.isUserAuthenticated(),
              username: '',
              password: '',
            })
          }
        }).catch(err => {
          console.log(err)
        })
    }

    handleLogout(){
      fetch('/logout', {
        method: 'DELETE',
        headers: {
          token: Auth.getToken(),
          'Authorization': `Token ${Auth.getToken()}`,
        }
      }).then(res => {
        Auth.deauthenticateUser();
        this.setState({
          auth: Auth.isUserAuthenticated(),
          username: '',
          password: '',
        })
      })
    }
    
    handleAdminLoginSubmit(e, data){
      e.preventDefault();
      console.log(data);
      fetch('/admin-login', {
        method: 'POST',
        body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.token) {
            AdminAuth.authenticateToken(res.token);
            this.setState({
              adminAuth: AdminAuth.isUserAuthenticated(),
              username: '',
              password: '',
            })
          }
        }).catch(err => {
          console.log(err)
        })
    }

    handleAdminLogout(){
      fetch('/admin-logout', {
        method: 'DELETE',
        headers: {
          token: AdminAuth.getToken(),
          'Authorization': `Token ${Auth.getToken()}`,
        }
      }).then(res => {
        AdminAuth.deauthenticateUser();
        this.setState({
          adminAuth: AdminAuth.isUserAuthenticated(),
          username: '',
          password: '',
        })
      })
    }

  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <Nav handleLogout={this.handleLogout} auth={this.state.auth} />
            <Switch>
              <Route exact path="/" render={() => (this.state.auth ?
                             (<Redirect to="/dash-nav" />)
                             :
                             (<Login handleLoginSubmit={this.handleLoginSubmit}
                                    handleChange={this.handleChange}
                                    auth={this.state.auth}
                                    username={this.state.username}
                                    password={this.state.password}
                                    />))} />
              <Route exact path="/react-admin" render={() => (this.state.adminAuth ?
                             (<Controller />)
                             :
                             (<AdminLogin handleAdminLoginSubmit={this.handleAdminLoginSubmit}
                                          handleChange={this.handleChange}
                                          adminAuth={this.state.adminAuth}
                                          username={this.state.username}
                                          password={this.state.password}
                                          />))} />     
              <Route exact path="/dash-nav" render={() => (this.state.auth ?
                            (<DashNav />)
                            :
                            (<Login handleLoginSubmit={this.handleLoginSubmit}
                                   handleChange={this.handleChange}
                                   auth={this.state.auth}
                                   username={this.state.username}
                                   password={this.state.password}
                                   />))} />
              <Route exact path="/dashboard" render={() => (this.state.auth ?
                             (<Questionnaire />)
                             :
                           (<Login handleLoginSubmit={this.handleLoginSubmit}
                                    handleChange={this.handleChange}
                                    auth={this.state.auth}
                                    username={this.state.username}
                                    password={this.state.password}
                                    />))} />
              <Route exact path="/intervisitation-log" render={() =>
                            <IntervisitationQuestionnaire />} />
              <Route exact path="/schools" render={() =>
                            <SchoolData />} />
              <Route exact path="/results" render={() =>
                            <FilteredResults />} />
            </Switch>

            </div>
        </div>
      </Router>
    );
  }
}

export default App;