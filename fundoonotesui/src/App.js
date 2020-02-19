import React from 'react';
import './App.scss';
import Signin from './components/Accounts/signin'
import Registration from './components/Accounts/registration'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ForgotPassword from './components/Accounts/ForgotPassword'
import ResetPassword from './components/Accounts/ResetPassword'
import DashBoard from './components/DashBoard';
import Demo from './components/Demo'
import AllNotes from './components/AllNotes';
import Archive from './components/Archive';
import Trash from './components/Trash';
import ReminderNotes from './components/ReminderNotes';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
        
           <Route path="/" exact component={Signin}/>
            <Route path="/signin" component={Signin} />
            <Route path="/registration" component={Registration}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/resetpassword/:token" component={ResetPassword}/>
            <Route path="/dashboard" component={DashBoard}/>
            <Route path="/dashboard/notes" component={AllNotes}/>
            <Route path="/dashboard/archive"component={Archive} />
            <Route path="/dashboard/trash" component={Trash} />
            <Route path="/dashboard/reminders" component={ReminderNotes}/>
            <Route path="/demo" component={Demo}/>
          
        </div>
      </Router>
    </div>
  );
}

export default App;
