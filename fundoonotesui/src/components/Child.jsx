import React, { Component } from 'react';

class Child extends Component{
    
    render()
    {
        return(
            <>
        <h1>child={this.props.number}</h1>
        <h1>child={this.props.name}</h1>
        </>
        )
    }
}
export default Child