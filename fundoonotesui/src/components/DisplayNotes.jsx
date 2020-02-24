import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
import '../scss/displaynotes.scss'
import UpdateNote from './UpdateNote';
class DisplayNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            labels:[],
            noteId:'',
            change: false
        }
        //  this.HandleEditNote = this.HandleEditNote.bind(this)
    }
    HandleEditNote = (element) => {
        this.setState(prevState => ({
            change: !prevState.change,
            noteId:element.id,
            title: element.title,
            description: element.description
        }))


        console.log("alsk", this.state);

    }
   
    render() {
        console.log('==>', this.props.AllNotes);
        const notes = this.props.AllNotes.map((element, index) => {
            return (
                <div style={{ marginBottom: '20px', width: '250px', marginRight: '25px' }} key={index} >
                    <div /*className="displaycard"*/>
                        <Card variant="outlined" >
                            <div onClick={() => this.HandleEditNote(element)}>
                                <div className="inputbasediv" >
                                    <div className="inputbase"  >
                                        {element.title}
                                    </div>
                                    <div className="inputbase">
                                        {element.description}
                                    </div>
                                </div>
                            </div>
                            <div className="noteiconsdiv">
                                <Icons note={element} />
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
                    {this.state.change ? <UpdateNote object={this.state} parentCallback={this.parentCallback}></UpdateNote> : null}
                </div>
            </div>
        )
    }
}
export default DisplayNotes