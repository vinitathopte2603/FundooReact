import React, { Component } from 'react';
import CreateNote from './CreateNote'
import DisplayNotes from './DisplayNotes'
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
class AllNotes extends Component {
  
    constructor(props){
        super(props);
        this.state ={
           getAllNote:[]
        }
    }
    GetAllNotes=()=>{

    }
    render() {
      
        return (
            <div>
                <h1>all notes are here</h1>
                <CreateNote />
                <div style={{marginTop:'3%'}}>
                <DisplayNotes  />
                </div>
            </div>
        )
    }
}
export default AllNotes