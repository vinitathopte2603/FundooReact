import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import NoteServices from '../services/NoteServices';
const notesServices = new NoteServices()
class Trash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTrash: [],
            reverseArray: []
        }
    }

    GetAllTrashed = () => {
        notesServices.GetAllTrash().then(response => {
           
            this.reverseArray = response.data.data
            this.allTrash = this.reverseArray.reverse()
            if (response.data.data != null) {
                this.setState({ allTrash: response.data.data })
            }
        })
    }
    componentDidMount = () => {
        this.GetAllTrashed()
    }
    parentCallback = () => {
      

        this.GetAllTrashed()
    }
    render() {
        return (
            <div style={{ marginTop: '80px' }}>
                <DisplayNotes parentToAllNoteCallback={this.parentCallback} AllNotes={this.state.allTrash} />

            </div>
        )
    }
}
export default Trash