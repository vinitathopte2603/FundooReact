import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import NoteServices from '../services/NoteServices';
import CreateNote from './CreateNote'
const notesServices = new NoteServices()
class NotesByLabelId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabelledNotes: [],
          
        }
    }

    GetAllLabelled = () => {
        notesServices.GetAllLabelledNotes().then(response => {
            console.log("data", response.data);
            if (response.data.data != null) {
                this.setState({ allLabelledNotes: response.data.data })
            }
           
        })
    }
    componentDidMount = () => {
        this.GetAllLabelled()
    }
    render() {
        return (
            <div>
                <h1>ksjdbvhjdsbc</h1>
              
                   
                    <div>
                        <CreateNote />
                        <div style={{ marginTop: '20px' }}>
                            <DisplayNotes AllNotes={this.state.allLabelledNotes} />
                        </div>
                    </div>
                
            </div>
        )
    }
}
export default NotesByLabelId