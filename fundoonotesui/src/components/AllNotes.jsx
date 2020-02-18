import React, { Component } from 'react';
import CreateNote from './CreateNote'
import DisplayNotes from './DisplayNotes'
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import UserServices from '../services/UserServices';
const notesServices = new UserServices()
class AllNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allNote: []
        }
    }
    componentDidMount=()=>{
        this.GetAllNote()
    }
    GetAllNote = () => {
        var token = localStorage.getItem("logintoken")
        console.log("adc",token);
        
        notesServices.GetAllNotes(token).then(response => {
            // console.log("data",response.data.data);
            if(response.data.data!=null)
            {
                this.setState({ allNote: response.data.data })
            }
      
        })
    }
    render() {

        return (
            <div>
                <h1>all notes are here</h1>
                <CreateNote />
                <div style={{ marginTop: '3%' }}>
                    <DisplayNotes AllNotes = {this.state.allNote}/>
                </div>
            </div>
        )
    }
}
export default AllNotes