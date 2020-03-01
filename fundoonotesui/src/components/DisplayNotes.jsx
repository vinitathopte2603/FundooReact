import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
import '../scss/displaynotes.scss'
import UpdateNote from './UpdateNote';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { Avatar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const collabtheme = createMuiTheme({
    overrides: {
        MuiAvatar: {
            colorDefault: {
                color: "blue",
                backgroundColor : "lightblue"
        },
        root:{
            height:'25px',
            width:'25px'
        }
      }
    }
  });
class DisplayNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            noteId: '',
            change: false
        }
        
    }
    HandleEditNote = (element) => {
        this.setState(prevState => ({
            change: !prevState.change,
            noteId: element.id,
            title: element.title,
            description: element.description
        }))

    }
    CallBack = () => {
        this.props.parentToAllNoteCallback();
    }
    render() {
        console.log('==>', this.props.AllNotes);
        const notes = this.props.AllNotes.map((element, index) => {
            return (
                <div style={{ marginBottom: '20px', width: '250px', marginRight: '25px' }} key={index} >
                    <div className="displaycard">
                        <Card variant="outlined" style={{ backgroundColor: element.color }}>
                            <div onClick={() => this.HandleEditNote(element)}>
                                <div className="inputbasediv" >
                                    <div className="inputbase"  >
                                        {element.title}
                                    </div>
                                    <div className="inputbase">
                                        {element.description}
                                        
                                    </div>
                                    <ThemeProvider theme={collabtheme}>
                                    <div className="chips">
                                    <div >
                                        {element.labels != null ? <div className="chips">
                                            {element.labels.map((item, labelindex) => {
                                                return (
                                                    <div key={labelindex} >
                                                        <div style={{marginTop:'5px', marginRight:'3px', marginLeft:'3px'}}>
                                                        <Chip
                                                            label={item.label}
                                                            onDelete={this.handleDelete}
                                                            style={{backgroundColor:element.color}}

                                                        />
                                                        </div>
                                                    </div>

                                                )
                                            })}
                                        </div> : null}
                                    </div>
                                    <div>
                                        {element.collaborations != null ? <div className="chips">
                                            {element.collaborations.map((data, collabindex) => {
                                                return (
                                                    <div key={collabindex} style={{marginTop:'5px'}}>
                                                        <div style={{marginTop:'5px', marginRight:'3px',marginLeft:'3px'}}>
                                                            <Tooltip title={data.email}>
                                                            <Avatar name="{{data.email}}"/>
                                                            </Tooltip>
                                                        </div>
                                                    </div>

                                                )
                                            })}
                                        </div> : null}
                                    </div>
                                    </div>
                                    </ThemeProvider>
                                </div>
                            </div>
                            <div
                              className="iconvisi"
                             >
                            <div className="noteiconsdiv">
                                <Icons parentCallback={this.CallBack} note={element} />
                            </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="notesdisplay">
                    {notes}
                </div>
                <div>
                    {this.state.change ? <UpdateNote object={this.state} parentCallback={this.CallBack}></UpdateNote> : null}
                </div>
            </div>
        )
    }
}
export default DisplayNotes