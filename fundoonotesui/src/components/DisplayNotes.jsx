import React, { Component } from 'react';
import CreateNote from './CreateNote'
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import Icons from './Icons'
import '../../src/scss/createnote.scss'
class DisplayNotes extends Component{
 
    render()
    {
        return(
            <div className="note">
                <Card>
                    <div className="inputbasediv">
                        <div className="inputbase">
                            <InputBase
                                placeholder="Title"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                            
                            />
                        </div>
                    
                         <div className="inputbase">
                         
                            <InputBase
                                placeholder="Take a note"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                            />
                        </div> 
                    </div>
                  
                    <div className="noteiconsdiv">
                           <Icons/>
                        </div>
                </Card>
            </div>
        )
    }
}
export default DisplayNotes