import React, { Component } from 'react';
import Child from './Child'
class AllNotes extends Component{
    constructor(props){
        super(props);
        this.state ={
            number : 1234,
            name:'vini'
        }
    }
    render()
    {
        return(
            <div>
             <h1>all notes are here</h1>
            <Child number={this.state.number} name={this.state.name} />
            </div>
        )
    }
}
export default AllNotes