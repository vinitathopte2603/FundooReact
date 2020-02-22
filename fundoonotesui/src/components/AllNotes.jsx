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
            reverseArray: []

        }
    }
    componentDidMount = () => {
        this.GetAllNote()
    }
    GetAllNote = () => {
        notesServices.GetAllNotes().then(response => {
            // console.log("data",response.data.data);
            this.reverseArray = response.data.data.filter(note => note.isTrash === false && note.isArchive === false)
            this.reverseArray.reverse()
            if (response.data.data != null) {
                this.setState({ allNote: this.reverseArray })
            }
        })
    }
    parentCallback = () => {
        console.log("in all notes");

        this.GetAllNote()
    }
    render() {

        return (
          
             
                <div>
                    <div style={{marginTop:'95px'}}>
                    <CreateNote parentCallback={this.parentCallback} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <DisplayNotes AllNotes={this.state.allNote} />
                    </div>
                </div>
         
        )
    }
}
export default AllNotes