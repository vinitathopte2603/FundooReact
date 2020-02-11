import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Signin from './components/signin'
import Registration from './components/registration'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import DashBoard from './components/DashBoard';
import Demo from './components/Demo'
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
           <Route path="/" exact component={Signin}/>
             <Route path="/signin" component={Signin} />
            <Route path="/registration" component={Registration}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/resetpassword" component={ResetPassword}/>
            <Route path="/dashboard" component={DashBoard}/>
            <Route path="/demo" component={Demo}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
