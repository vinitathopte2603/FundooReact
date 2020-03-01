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
            <Route path="/u/0" component={DashBoard}/> 
            <Route path="/u/0/notes" component={AllNotes}/>
            <Route path="/u/0/archive"component={Archive} />
            <Route path="/u/0/trash" component={Trash} />
            <Route path="/u/0/label/:label" component={NotesByLabelId}/>
            <Route path="/u/0/reminders" component={ReminderNotes}/>
          
            
          
        </div>
      </Router>
    </div>
  );
}

export default App;
