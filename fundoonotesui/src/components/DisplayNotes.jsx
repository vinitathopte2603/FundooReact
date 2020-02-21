import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
import '../scss/displaynotes.scss'
class DisplayNotes extends Component{
 constructor(props){
     super(props);
     this.state={
         title:'',
         description:''
     }
 }

    render()
    {
        console.log('==>',this.props.AllNotes);
        const notes = this.props.AllNotes.map((element,index)=>{
            return(
                <div style={{marginBottom:'20px',width:'250px',marginRight: '25px'}} key={index}>
                    <div >
                <Card  variant="outlined">
                <div className="inputbasediv">
                    <div className="inputbase">
                       {element.title}
                    </div>
                     <div className="inputbase">
                       {element.description}
                    </div> 
                </div>
              
                <div className="noteiconsdiv">
                       <Icons note={element}/>
                    </div>
            </Card>
            </div>
            </div>
            )

        })
        return(
            <div className="notesdisplay">
        {notes}
            </div>
        )
    }
}
export default DisplayNotes