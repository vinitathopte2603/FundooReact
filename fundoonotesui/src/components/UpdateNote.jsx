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
        notesServices.UpdateNote(this.props.note.noteId, data).then(response => {
           
            this.props.parentCallback();
            

        })
        this.HandleClose()
    }
    componentDidMount() {
        this.setState({
            title: this.props.note.title,
            description: this.props.note.description
        })
    }
    OnChange = (e) => {
      
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
    
        return (
            <div>
                <Dialog  open={this.state.openDialog} onClose={this.HandleClose}>
                    <DialogContent style={{backgroundColor:this.props.note.color,padding:0}}>
                      <div>
                          <div>
                              <img src={this.props.note.image} alt=""></img>
                          </div>
                          <div style={{marginLeft:'13px'}}>
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
                        </div>
                        </div>
                    </DialogContent>
                    <DialogActions style={{padding:0}}>
                        <div style={{backgroundColor:this.props.note.color}} className="noteiconsdiv">
                            <div>
                                <Icons note={this.props.note} />
                             
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