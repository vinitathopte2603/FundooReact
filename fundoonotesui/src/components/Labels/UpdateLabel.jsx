import React, { Component } from 'react';
import { Dialog, DialogContent, InputBase, DialogActions, IconButton, TextField } from '@material-ui/core';
import LabelServices from '../../services/LabelServices';
import Button from '@material-ui/core/Button';
import LabelRoundedIcon from '@material-ui/icons/LabelRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../scss/editlabel.scss'
const labelsServices = new LabelServices()
class UpdateLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openEdit: true,
            closeEdit: false,
            labels: [],
            edit: false,
            cancel: false,
            newlabel: '',
            editlabel:'',
            delete:false,
            
        }
    }
    HandleCloseDialog = () => {
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

  
    Handlecreate = () => {
        var data = {
            Label: this.state.newlabel
        }
        labelsServices.CreateLabel(data).then(response => {
           

        })
    }
    newlabelonchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    OnChange = (e, key, item) => {
        console.log("setstate", e.currentTarget.value, item.label);
        // this.setState({ [e.target.name]: e.target.value });
        this.setState({
            editlabel : e.currentTarget.value
        }) 
      var  edi= e.currentTarget.value
      console.log("current value in ",this.state.editlabel);
      
        var stateCopy = Object.assign({}, this.state);
        stateCopy.labels[key].label = e.currentTarget.value;
        this.setState(stateCopy);
    }
    HandleEdit = (id) => {
console.log("submit edit ",this.state.editlabel);

        var data = {
            Label: this.state.editlabel
        }
        console.log("new label",data.Label);
        
        labelsServices.EditLabel(data,id).then(response=>{
            console.log("new ",response.data);
            
        })
    }
    handleCancel = () => {
        this.setState({ cancel: !this.state.cancel })
    }
    HandleDeleteLabel=(Id)=>{
        this.setState({ delete:true})
    
        
        if(this.state.delete===true)
        {
            this.DeleteLabel(Id)
        }
    }
    DeleteLabel = (id) => {
        labelsServices.Deletelabel(id).then(response => {
            console.log("note deleted",response);
        })
    }
    render() {
        const alllabels = this.state.labels.map((item, index) => {
            return (
                <div key={index}>
                    <div >
                        <div className="editicons">
                            <div className="Hide">
                                <IconButton>
                                    <LabelRoundedIcon />
                                </IconButton>
                            </div>
                            <div className="Show" >
                                <IconButton onClick={()=>this.HandleDeleteLabel(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            <InputBase
                                placeholder="Title"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                                name="editlabel"
                                value={item.label}
                                onChange={(e) => this.OnChange(e, index, item)}
                            />
                            <IconButton onClick={()=>this.HandleEdit(item.id)}>
                                <EditRoundedIcon />
                            </IconButton>
                        </div>

                    </div>
                </div>
            )
        })
        return (
            <div >
                <Dialog open={this.state.openEdit} onClose={this.HandleCloseDialog}>
                    <div>Edit labels</div>
                    <div >
                        <IconButton onClick={this.handleCancel}>
                            {this.state.cancel ? <AddIcon /> : <ClearIcon></ClearIcon>}
                        </IconButton>

                        <TextField
                            placeholder="Create new label"
                            multiline
                            inputProps={{ 'aria-label': 'naked' }}
                            name="newlabel"
                            value={this.state.label}
                            onChange={this.newlabelonchange}
                            onClick={this.icons}
                        />
                    </div>
                    <DialogContent>
                        <div style={{ maxHeight: '392px' }}>
                            {alllabels}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {this.state.edit ?
                            <Button onClick={this.HandleEdit}>
                                Done
                            </Button> :
                            <Button onClick={this.Handlecreate}>
                                Done
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default UpdateLabel