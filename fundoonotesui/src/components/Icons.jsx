import React, { Component } from 'react';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import '../scss/createnote.scss'

class Icons extends Component{
    render(){
        return(
            <div className="noteiconsdiv">
<IconButton >
<AddAlertOutlinedIcon style={{ fontSize: '17' }} />
</IconButton>
<IconButton>
<PersonAddOutlinedIcon style={{ fontSize: '17' }} />
</IconButton>
<IconButton>
<PaletteOutlinedIcon style={{ fontSize: '17' }} />
</IconButton>
<IconButton>
<ImageOutlinedIcon style={{ fontSize: '17' }} />
</IconButton>
<IconButton>
<ArchiveOutlinedIcon style={{ fontSize: '17' }} />
</IconButton>
<IconButton>
<MoreVertIcon style={{ fontSize: '17' }} />
</IconButton>
</div>
        )
}
}

export default Icons