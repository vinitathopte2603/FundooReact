import React, { Component } from 'react';
import CreateNote from './CreateNote'
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
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
                <Card key={index}>
                <div className="inputbasediv">
                    <div className="inputbase">
                       {element.title}
                    </div>
                
                     <div className="inputbase">
                       {element.description}
                    </div> 
                </div>
              
                <div className="noteiconsdiv">
                       <Icons/>
                    </div>
            </Card>
            )

        })
        return(
            <div className="note">
        {notes}
            </div>
        )
    }
}
export default DisplayNotes