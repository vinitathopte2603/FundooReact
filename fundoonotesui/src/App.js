import React from 'react';
import './App.scss';
import Signin from './components/Accounts/signin'
import Registration from './components/Accounts/registration'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ForgotPassword from './components/Accounts/ForgotPassword'
import ResetPassword from './components/Accounts/ResetPassword'
import DashBoard from './components/DashBoard';
import AllNotes from './components/AllNotes';
import Archive from './components/Archive';
import Trash from './components/Trash';
import ReminderNotes from './components/ReminderNotes';
import NotesByLabelId from './components/NotesByLabelId';
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
            <Route path="/notes" component={DashBoard}/>
            <Route path="/notes" component={AllNotes}/>
            <Route path="/archive"component={Archive} />
            <Route path="/trash" component={Trash} />
            <Route path="/dashboard/labels" component={NotesByLabelId}/>
            <Route path="/reminders" component={ReminderNotes}/>
            
          
        </div>
      </Router>
    </div>
  );
}

export default App;
