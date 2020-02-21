import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import UserServices from '../services/UserServices';
const notesServices = new UserServices()
class Trash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTrash: [],
            reverseArray:[]
        }
    }

    GetAllTrashed = () => {
        notesServices.GetAllTrash().then(response => {
            console.log("data", response.data);
            this.reverseArray=response.data.data
            this.allTrash=this.reverseArray.reverse()
            if (response.data.data != null) {
                this.setState({ allTrash: response.data.data })
            }
        })
    }
    componentDidMount=()=>{
        this.GetAllTrashed()
    }
    render() {
 return(
     <div style={{marginTop:'80px'}}>
          <DisplayNotes AllNotes={this.state.allTrash} /> 
     </div>
 )
    }
}
export default Trash