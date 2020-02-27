import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import '../../src/scss/createnote.scss'
import '../scss/displaynotes.scss'
import Icons from './Icons'
import NoteServices from '../services/NoteServices';
const notesServices = new NoteServices()
class UpdateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            labels: [],
            collaborations: [],
            closeDialog: false,
            openDialog: true
        }
    }
    HandleClose = () => {
        this.setState(prevState => ({
            closeDialog: !prevState.closeDialog,
            openDialog: !prevState.openDialog
        }))
    }
    Update = () => {
        var data = {
            Title: this.state.title,
            Description: this.state.description,
            labels: this.state.labels,
            Collaborators: this.state.collaborations
        }
        notesServices.UpdateNote(this.props.object.noteId, data).then(response => {
            console.log("note update", response);
            this.props.parentCallback();
            console.log("parent call back", this.props.parentCallback);

        })
        this.HandleClose()
    }
    componentDidMount() {
        this.setState({
            title: this.props.object.title,
            description: this.props.object.description
        })
    }
    OnChange = (e) => {
        console.log("setstate", e.value);
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        console.log(this.props.object)
        return (
            <div>
                <Dialog open={this.state.openDialog} onClose={this.HandleClose}>
                    <DialogContent>
                        <div  >
                            <InputBase
                                placeholder="Title"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                                name="title"
                                value={this.state.title}
                                onChange={this.OnChange}
                            />
                        </div>
                        <div >
                            <InputBase
                                placeholder="Take a note"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                                name="description"
                                value={this.state.description}
                                onChange={this.OnChange}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className="noteiconsdiv">
                            <div>
                                <Icons note={this.props.object} />
                            </div>
                            <div>
                                <Button style={{ marginRight: '9px', color: "dimgray" }} onClick={this.Update}>Close</Button>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default UpdateNote