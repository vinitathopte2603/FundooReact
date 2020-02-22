import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import '../../src/scss/createnote.scss'
import '../scss/displaynotes.scss'
import Icons from './Icons'

class UpdateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            labels: [],
            collaborations: [],
            open: false
        }
    }


    render() {
        console.log("kajsbcdvkjasbxc",this.props.object.change);
        
        return (

            <div>
                <Dialog  open={this.props.object.change}>
                    <DialogContent>
                        <div className="note">
                            <Card>
                                <div className="inputbasediv">
                                    <div className="inputbase">
                                        <InputBase
                                            placeholder="Title"
                                            multiline
                                            inputProps={{ 'aria-label': 'naked' }}
                                            // onClick={this.onTakeNote}
                                            name="title"
                                             value={this.props.object.title}
                                            // onChange={this.OnChange}
                                            style={{ width: '360%' }}
                                        />
                                    </div>

                                    <div className="inputbase">

                                        <InputBase
                                            placeholder="Take a note"
                                            multiline
                                            inputProps={{ 'aria-label': 'naked' }}
                                            name="description"
                                             value={this.props.object.description}
                                            // onChange={this.OnChange}
                                            style={{ width: '360%' }}
                                        />
                                    </div>
                                </div>

                                <div className="noteiconsdiv">
                                    <div>
                                        <Icons />
                                    </div>
                                    <div>
                                        <Button style={{ marginRight: '9px', color: "dimgray" }} onClick={this.Update}>Close</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )

    }

}
export default UpdateNote