import React, { Component } from 'react';
import {Dialog, DialogContent, InputBase } from '@material-ui/core';
import LabelServices from '../../services/LabelServices';
const labelsServices = new LabelServices()
class UpdateLabel extends Component{
    constructor(props){
        super(props);
        this.state={
            openEdit:true,
            closeEdit:false,
            labels:[],
            Label:''
        }
    }
    HandleCloseDialog=()=>{
        this.setState(prevState => ({
            closeEdit: !prevState.closeEdit,
            openEdit: !prevState.openEdit
        }))
    }
    componentDidMount = () => {
        this.GetAllLabels()
    }
    GetAllLabels = () => {
        labelsServices.GetAllLabels().then(response => {
            if (response.data.data != null) {
                this.setState({ labels: response.data.data })
            }
        })
    }
    OnChange = (e) => {
        console.log("setstate", e.value);
        this.setState({ [e.target.name]: e.target.value });
    }
    render(){
        const alllabels = this.state.labels.map((item, index) => {
            return (
                <div key={index}>
                    <div >
                    <InputBase
                                placeholder="Title"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                                name="label"
                                value={item.label}
                                onChange={this.OnChange}
                            />
                    </div>
                </div>
            )
        })
       return(
           <div>
           <Dialog open={this.state.openEdit} onClose={this.HandleCloseDialog}>
               <DialogContent>
                   <InputBase
                    placeholder="Title"
                    multiline
                    inputProps={{ 'aria-label': 'naked' }}
                    name="title"
                   />                   
               </DialogContent>
               <DialogContent>
               <div>
              {alllabels}
                   </div>
               </DialogContent>
           </Dialog> 
           </div>
       )
    }
}
export default UpdateLabel