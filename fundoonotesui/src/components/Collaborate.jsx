import React, { Component } from 'react';
import { Card, Dialog, InputBase, Avatar, Button, Paper } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import '../scss/collaborate.scss'
import NoteServices from '../services/NoteServices';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
const notesServices = new NoteServices()
class Collaborate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collab: true,
            collabed: [],
            keyword: '',
            userscollab: [],
            clb: []
        }
    }
    getAllUsers = (data) => {

        notesServices.GetAllUser(data).then(response => {
            this.setState({ collabed: response.data.data })
            console.log("sscasc", response.data)
        })
    }
    handlecollabclose = () => {
        this.setState({ collab: false })
    }
    OnChange = (e) => {
        console.log("data", this.props.noteid.collaborations);
        this.setState({ [e.target.name]: e.target.value })
        if (e.target.value != null) {
            this.getAllUsers(e.target.value)
        }

    }
    addcollab = (userid) => {

        var data = {
            userId: userid
        }
        this.state.userscollab.push(data)
        var userdata = {
            collaboratorRequestModels: this.state.userscollab
        }


        notesServices.AddCollaboration(this.props.noteid.id, userdata).then(response => {
            console.log("added", response.data)
        })
    }
    RemoveCollab=()=>{
       notesServices.RemoveCollaboration(this.props.noteid.id, userdata)
        
    }
    render() {


        let users = null
        if (this.state.collabed != null) {
            users = this.state.collabed.map((item, index) => {
                return (
                    <div key={index}>

                        <Paper >
                            <div className="addcollab">
                                <div>
                                    {item.email}
                                </div>
                                <div>
                                    <DoneIcon onClick={() => this.addcollab(item.userId)}></DoneIcon>
                                </div>
                            </div>
                        </Paper>

                    </div>
                )
            })
        }
        return (
            <div>
                <Dialog open={this.state.collab} onClose={this.handlecollabclose}>
                    <Card style={{ height: '100%', width: '588px' }}>
                        <div className="cardpadding">
                            <div className="collabtitle">
                                Collaborators
                    </div>
                            <div className="collabmaindiv">
                                <div className="ownerdiv">
                                    <div>
                                        <Avatar src={localStorage.getItem("imageurl")} style={{ height: '40px', width: '40px' }} />
                                    </div>
                                    <div style={{ marginTop: '5px', marginLeft: '10px' }}>
                                        <div className="collabowner">
                                            {localStorage.getItem("first")} (owner)
                  </div>
                                        <div style={{ color: '#5f6368', fontSize: '13px' }}>
                                            {localStorage.getItem("email")}
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    {this.props.noteid.collaborations.map((item, index) => {
                                        return (
                                            <div key={index} className="ownerdiv">
                                                <div>
                                                    <Avatar src="/broken-image.jpg" style={{ height: '40px', width: '40px' }} />
                                                </div>

                                                <div style={{ marginTop: '5px', marginLeft: '10px' }}>
                                                    {item.email}

                                                </div>
                                                <div style={{marginLeft:'254px'}}>
                                                    <CloseIcon onClick={this.RemoveCollab}/>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="ownerdiv">
                                    <PersonAddIcon />
                                    <InputBase
                                        name="keyword"
                                        placeholder="Person or email to share with"
                                        style={{ width: '253px', marginLeft: '21px' }}
                                        value={this.state.keyword}
                                        onChange={this.OnChange}
                                    />
                                </div>

                                <div>
                                    {users}
                                </div>
                            </div>
                        </div>
                        <div className="collabbutton">
                            <div className="collabcancel">
                                <Button onClick={this.handlecollabclose}>Cancel</Button>
                            </div>
                            <Button onClick={this.getAllUsers}>Save</Button>
                        </div>
                    </Card>

                </Dialog>
            </div>
        )
    }
}
export default Collaborate