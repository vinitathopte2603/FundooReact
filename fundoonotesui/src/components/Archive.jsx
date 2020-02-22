import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import UserServices from '../services/UserServices';
const notesServices = new UserServices()
class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allArchive: [],
            reverseArray: []
        }
    }

    GetAllArchives = () => {
        notesServices.GetAllArchive().then(response => {
            console.log("data", response.data);
            this.reverseArray = response.data.data;
            this.allArchive = this.reverseArray.reverse()
            if (response.data.data != null) {
                this.setState({ allArchive: response.data.data })
            }
        })
    }
    componentDidMount = () => {
        this.GetAllArchives()
    }
    render() {
        return (
            <div style={{ marginTop: '80px' }}>
                <DisplayNotes AllNotes={this.state.allArchive} />
            </div>
        )
    }
}
export default Archive