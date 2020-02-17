import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
class CreateNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            takeNote: false
        }
    }
    onTakeNote = () => {
        this.setState({ takeNote: !this.state.takeNote })
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
                            />
                        </div>
                        {this.state.takeNote ?
                         <div className="inputbase">
                         
                            <InputBase
                                placeholder="Take a note"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                            />
                        </div> : null}
                    </div>
                    {this.state.takeNote?
                    <div className="noteiconsdiv">
                        <div>
                            <Icons/>
                        </div>
                        <div>
                            <Button >Close</Button>
                        </div>
                    </div>:null}
                </Card>
            </div>
        );
    }
}
export default CreateNote