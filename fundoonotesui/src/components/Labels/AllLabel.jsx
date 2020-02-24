import React, { Component } from 'react';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelServices from '../../services/LabelServices';
import '../../scss/label.scss'
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
    render() {

        const labels = this.state.allLabels.map((item, index) => {
            return (
                <div className="label">
                    <ListItem button key="Labels" >
                        <ListItemIcon> <LabelOutlinedIcon /></ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
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