import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import UserServices from '../services/UserServices';
const notesServices = new UserServices()
class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allArchive: []
        }
    }

    GetAllArchives = () => {
        notesServices.GetAllArchive().then(response => {
            console.log("data", response.data);
            if (response.data.data != null) {
                this.setState({ allArchive: response.data.data })
            }
        })
    }
    componentDidMount=()=>{
        this.GetAllArchives()
    }
    render() {
 return(
     <div style={{marginTop:'80px'}}>
          <DisplayNotes AllNotes={this.state.allArchive} /> 
     </div>
 )
    }
}
export default Archive