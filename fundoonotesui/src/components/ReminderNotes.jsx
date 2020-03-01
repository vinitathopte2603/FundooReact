import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import NoteServices from '../services/NoteServices';
import CreateNote from './CreateNote'
const notesServices = new NoteServices()
class ReminderNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allReminder: [],
          
        }
    }

    GetAllRemindered = () => {
        notesServices.GetAllReminder().then(response => {
            
            if (response.data.data != null) {
                this.setState({ allReminder: response.data.data })
            }
          
        })
    }
    componentDidMount = () => {
        this.GetAllRemindered()
    }
    render() {
        return (
            <div>
                <h1>ksjdbvhjdsbc</h1>
              
                   
                    <div>
                        <CreateNote />
                        <div style={{ marginTop: '20px' }}>
                            <DisplayNotes AllNotes={this.state.allReminder} />
                        </div>
                    </div>
                
            </div>
        )
    }
}
export default ReminderNotes