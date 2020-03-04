import React, { Component } from 'react';
import CreateNote from './CreateNote'
import DisplayNotes from './DisplayNotes'
import NoteServices from '../services/NoteServices';
import '../scss/allnotes.scss'
const notesServices = new NoteServices()
class AllNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allNote: [],
            reverseArray: [],
            pinned: [],
            pinResponse: ''

        }
    }
    componentDidMount = () => {
        this.GetAllNote()
        this.GetPinnedNotes()
    }
    GetAllNote = () => {
        notesServices.GetAllNotes().then(response => {

            this.reverseArray = response.data.data.filter(note => note.isTrash === false && note.isArchive === false && note.isPin === false)
            this.reverseArray.reverse()
            if (response.data.data != null) {
                this.setState({ allNote: this.reverseArray })
            }
        })
    }
    GetPinnedNotes = () => {
        notesServices.GetPinned().then(response => {
            console.log("response", response.data.data);

            if (response.data.data != null) {
                this.setState({
                    pinned: response.data.data,

                })
            }


        })
    }
    parentCallback = () => {

        this.GetPinnedNotes()
        this.GetAllNote()
    }
    render() {
        return (
            <div>
                <div style={{ marginTop: '95px' }}>
                    <CreateNote parentCallback={this.parentCallback} />
                </div>
                
                    <div className="pinned">
                        Pinned
                </div> 
                <div style={{ marginTop: '75px' }}>
                    <DisplayNotes parentToAllNoteCallback={this.parentCallback} AllNotes={this.state.pinned} />
                </div>
              
                    <div className="pinned">
                        Others
                </div> 
                <div style={{ marginTop: '75px' }}>
                    <DisplayNotes parentToAllNoteCallback={this.parentCallback} AllNotes={this.state.allNote} />
                </div>
            </div>

        )
    }
}
export default AllNotes