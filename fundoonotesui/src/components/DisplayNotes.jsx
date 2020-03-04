import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
import '../scss/displaynotes.scss'
import UpdateNote from './UpdateNote';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { Avatar, IconButton } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import pin from '../images/pin.png';
import unpin from '../images/unpin.png';
import NoteServices from '../services/NoteServices';
import Masonry from 'react-masonry-css'
const notesServices = new NoteServices()
const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1
  };
const collabtheme = createMuiTheme({
    overrides: {
        MuiAvatar: {
            colorDefault: {
                color: "blue",
                backgroundColor: "lightblue"
            },
            root: {
                height: '25px',
                width: '25px'
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
    pinNote = (element) => {
        console.log("noteid", element.id);

        if (element.isPin === true) {
            let data = { value: false }
            notesServices.PinNote(element.id, data).then(response => {

                this.props.parentToAllNoteCallback();
                console.log("note unpinned", response.data);


            })
        }
        else {
            let data = { value: true }
            notesServices.PinNote(element.id, data).then(response => {

                this.props.parentToAllNoteCallback();
                console.log("note pinned", response.data);

            })
        }

    }
    render() {
        console.log('==>', this.props.AllNotes);
        const notes = this.props.AllNotes.map((element, index) => {
            return (
                <div style={{ marginBottom: '20px', width: '250px', marginRight: '25px' }} key={index} >
                    <div className="displaycard">
                        <Card variant="outlined" style={{ backgroundColor: element.color }}>
                            <div className="iconvisi" style={{ float: 'right', marginRight: '48px' }}>
                                <div style={{ position: 'absolute', margintop: '5px' }}>
                                    <IconButton onClick={() => this.pinNote(element)} style={{ height: '50px', width: '50px' }}>
                                        {element.isPin ?

                                            <img src={pin} />
                                            :
                                            <img src={unpin} />}
                                    </IconButton>
                                </div>
                            </div>
                            <div>
                                {element.image === null ? null :
                                    <div className="box">
                                        <img src={element.image}></img>
                                    </div>}
                            </div>

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
                                                                <div style={{ marginTop: '5px', marginRight: '3px', marginLeft: '3px' }}>
                                                                    <Chip
                                                                        label={item.label}
                                                                        onDelete={this.handleDelete}
                                                                        style={{ backgroundColor: element.color }}
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
                                                            <div key={collabindex} style={{ marginTop: '5px' }}>
                                                                <div style={{ marginTop: '5px', marginRight: '3px', marginLeft: '3px' }}>
                                                                    <Tooltip title={data.email}>
                                                                        <Avatar name="{{data.email}}" />
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
                            <div className="iconvisi">
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
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        

                        {notes}
                    </Masonry>
                </div>
                <div>
                    {this.state.change ? <UpdateNote object={this.state} parentCallback={this.CallBack}></UpdateNote> : null}
                </div>
            </div>
        )
    }
}
export default DisplayNotes