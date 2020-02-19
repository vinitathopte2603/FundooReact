import React, { Component } from 'react';
import CreateNote from './CreateNote'
import DisplayNotes from './DisplayNotes'
import UserServices from '../services/UserServices';
const notesServices = new UserServices()
class AllNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allNote: [],
            firstNote: false
        }
    }
    componentDidMount = () => {
        this.GetAllNote()
    }
    GetAllNote = () => {
    
        

        notesServices.GetAllNotes().then(response => {
            // console.log("data",response.data.data);
            if (response.data.data != null) {
                this.setState({ allNote: response.data.data })
            }
            else {
                this.setState({ firstNote: !this.state.firstNote })
            }

        })
    }
    render() {

        return (
            <div>
                <h1>all notes are here</h1>
                {this.state.firstNote ?
                    <div>
                        <CreateNote />
                    </div> :
                    <div>
                        
                        <CreateNote />
                    
                        <div style={{ marginTop: '20px' }}>
                
                            <DisplayNotes AllNotes={this.state.allNote} />
                            </div>
            
                    </div>
                }
            </div>
        )
    }
}
export default AllNotes