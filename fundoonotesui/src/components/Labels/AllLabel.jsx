import React, { Component } from 'react';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelServices from '../../services/LabelServices';
import '../../scss/label.scss'
import NotesByLabelId from '../NotesByLabelId';
const labelsServices = new LabelServices()
class AllLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: []
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
    ShowNotes = () => {
        // this.props.history.push('/dashboard/labels')
    }
    render() {

        const labels = this.state.allLabels.map((item, index) => {
            return (
                <div key={index}>
                    <div className="label">
                        <ListItem button key="Labels" onClick={this.ShowNotes}>
                            <ListItemIcon> <LabelOutlinedIcon /></ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    </div>

                    {/* <NotesByLabelId note={item}></NotesByLabelId> */}

                </div>
            )
        })
        return (
            <div>
                {labels}
            </div>
        )
    }
}
export default AllLabel