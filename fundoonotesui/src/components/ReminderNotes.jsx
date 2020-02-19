import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import UserServices from '../services/UserServices';
import CreateNote from './CreateNote'
const notesServices = new UserServices()
class ReminderNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allReminder: [],
            createNoteReminder: false
        }
    }

    GetAllRemindered = () => {
        notesServices.GetAllReminder().then(response => {
            console.log("data", response.data);
            if (response.data.data != null) {
                this.setState({ allReminder: response.data.data })
            }
            else {
                this.setState({ createNoteReminder: !this.state.createNoteReminder })
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
                {this.state.createNoteReminder ?
                    <div>
                        <CreateNote />
                    </div> :
                    <div>
                    <CreateNote />
                    <div style={{ marginTop: '20px' }}>
                        <DisplayNotes AllNotes={this.state.allReminder} />
                    </div>
                    </div>
                }
            </div>
        )
    }
}
export default ReminderNotes