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
    // parentCallback=()=>{
    //     console.log("he ala ikade");
        
    //     this.GetAllNote()
    // }
    render() {

        return (
            <div>
                <h1>all notes are here</h1>
                <div>
                    <CreateNote/>
                    <div style={{ marginTop: '20px' }}>
                        <DisplayNotes AllNotes={this.state.allNote} />
                    </div>
                </div>
            </div>
        )
    }
}
export default AllNotes