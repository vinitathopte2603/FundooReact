import React, { Component } from 'react';
import CreateNote from './CreateNote'
import DisplayNotes from './DisplayNotes'
import NoteServices from '../services/NoteServices';
const notesServices = new NoteServices()
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
        
            this.reverseArray = response.data.data.filter(note => note.isTrash === false && note.isArchive === false)
            this.reverseArray.reverse()
            if (response.data.data != null) {
                this.setState({ allNote: this.reverseArray })
            }
        })
    }
    parentCallback = () => {
        

        this.GetAllNote()
    }
    render() {

        return (
          
             
                <div>
                    <div style={{marginTop:'95px'}}>
                    <CreateNote parentCallback={this.parentCallback} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <DisplayNotes parentToAllNoteCallback={this.parentCallback} AllNotes={this.state.allNote} />
                    </div>
                </div>
         
        )
    }
}
export default AllNotes