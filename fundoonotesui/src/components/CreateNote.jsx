import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
import UserServices from '../services/UserServices';

const notesServices = new UserServices()
class CreateNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            takeNote: false,
            title: '',
            description: '',
            
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
            Description: this.state.description
        }
        console.log("state changed",data);
        
        notesServices.CreateNote(data).then(response => {
            console.log("note created", response.data);

            // this.props.parentCallback();
            // console.log("minya sir", this.props.parentCallback);
            
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
                                />
                            </div> : null}
                    </div>
                    {this.state.takeNote ?
                        <div className="noteiconsdiv">
                            <div>
                                <Icons />
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