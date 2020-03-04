import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
import NoteServices from '../services/NoteServices';

const notesServices = new NoteServices()
class CreateNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            takeNote: false,
            title: '',
            description: '',
            labels: [],
            collaborations: [],
            note:{
                isTrash:false
            } 

        }
    }
    onTakeNote = () => {
        this.setState({ takeNote: !this.state.takeNote })
    }
    OnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        
    }
    Create = () => {
        this.setState({ takeNote: !this.state.takeNote })
        var data = {
            Title: this.state.title,
            Description: this.state.description,
            labels: this.state.labels,
            Collaborators: this.state.collaborations
        }
    

        notesServices.CreateNote(data).then(response => {
            
            this.setState({
                title: '',
                description: '',
                labels: [],
                collaborations: []

            })
            this.props.parentCallback();
            

        })
    }

    render() {
        return (
            <div className="note">
                <Card>
                    <div className="inputbasediv">
                        <div className="inputbase">
                            <InputBase
                                placeholder="Title"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                                onClick={this.onTakeNote}
                                name="title"
                                value={this.state.title}
                                onChange={this.OnChange}
                                style={{ width: '600px' }}
                            />
                        </div>
                        {this.state.takeNote ?
                            <div className="inputbase">

                                <InputBase
                                    placeholder="Take a note"
                                    multiline
                                    inputProps={{ 'aria-label': 'naked' }}
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.OnChange}
                                    style={{ width: '600px' }}
                                />
                            </div> : null}
                    </div>
                    
                    {this.state.takeNote ?
                        <div className="noteiconsdiv">
                            <div>
                                <Icons note={this.state.note} />
                            </div>
                            <div>
                                <Button style={{ marginRight: '9px', color: "dimgray" }} onClick={this.Create}>Close</Button>
                            </div>
                        </div> : null}
                </Card>

            </div>
        );
    }
}
export default CreateNote