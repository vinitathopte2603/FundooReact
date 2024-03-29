import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import NoteServices from '../services/NoteServices';
const notesServices = new NoteServices()
class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allArchive: [],
            reverseArray: []
        }
    }

    GetAllArchives = () => {
        notesServices.GetAllArchive().then(response => {
        
            this.reverseArray = response.data.data;
            this.allArchive = this.reverseArray.reverse()
            if (response.data.data != null) {
                this.setState({ allArchive: response.data.data })
                console.log("archived",response.data.data);
                
            }
          
        })
    }
    componentDidMount = () => {
        this.GetAllArchives()
    }
    parentCallback = () => {
        

        this.GetAllArchives()
    }
    render() {
        return (
            <div style={{ marginTop: '80px' }}>
                <DisplayNotes parentToAllNoteCallback={this.parentCallback} AllNotes={this.state.allArchive} />
            </div>
        )
    }
}
export default Archive