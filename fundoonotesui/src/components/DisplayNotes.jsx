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
            // editNote: false,
            change:false,
            data:[]
        }
        //  this.HandleEditNote = this.HandleEditNote.bind(this)
    }
    HandleEditNote=()=>{
        this.setState(prevState=>({
            change:!prevState.change,
            
        }))
        
      
        console.log("alsk",this.state.change);
        
        // console.log("user data",this.state.data);
        
    }
    render() {
        console.log('==>', this.props.AllNotes);
        const notes = this.props.AllNotes.map((element, index) => {
            return (
                <div style={{ marginBottom: '20px', width: '250px', marginRight: '25px' }} key={index} >
                    <div className="displaycard">
                        <Card variant="outlined" onClick={()=>this.HandleEditNote()}>
                            <div className="inputbasediv" >
                                <div className="inputbase"  >
                                    {element.title}
                                </div>
                                <div className="inputbase" >
                                    {element.description}
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
                {this.state.change ? <UpdateNote object={this.state}></UpdateNote> :null}
            </div>
        )
    }
}
export default DisplayNotes