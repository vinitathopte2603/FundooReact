import React, { Component } from 'react';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelServices from '../../services/LabelServices';
import '../../scss/label.scss'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import UpdateLabel from './UpdateLabel';


const labelsServices = new LabelServices()
class AllLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: [],
            editLabel: false,
            labelId: '',
            showNotesOnLabels: false
        }
    }
    componentDidMount = () => {
        this.GetAllLabels()
    }
    GetAllLabels = () => {
        labelsServices.GetAllLabels().then(response => {
            console.log("all labels", response.data.data);
            if (response.data.data != null) {
                this.setState({ allLabels: response.data.data })
            }
        })
    }
    EditLabel = () => {
        this.setState(prevState => ({
            editLabel: !prevState.editLabel,

        }))
    }
    ShowNotes = (data) => {
        this.props.props.history.push(`/u/0/label/${data.label}`)
    }

    render() {

        const labels = this.state.allLabels.map((item, index) => {
            return (
                <div key={index}>
                    <div className="label">
                        <ListItem button key="Labels" onClick={() => this.ShowNotes(item)}>
                            <ListItemIcon><LabelOutlinedIcon /></ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div>
                    {labels}
                </div>
                <div className="label">
                    <ListItem button key="Edit labels" onClick={this.EditLabel}>
                        <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Edit labels" />
                    </ListItem>
                </div>
                <div>
                    {this.state.editLabel ?
                        <UpdateLabel editstate={this.state.editLabel}></UpdateLabel> : null}
                </div>
            </div>
        )
    }
}
export default AllLabel