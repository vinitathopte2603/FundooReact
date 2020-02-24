import React, { Component } from 'react';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import '../scss/createnote.scss'
import { Card } from '@material-ui/core';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NoteServices from '../services/NoteServices';
const notesServices = new NoteServices()


class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: false
    }
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };
  TrashNote = () => {
    console.log("note", this.props.note.id)
    var data = { value: !this.state.value }
    notesServices.MoveToTrash(this.props.note.id, data).then(response => {
      console.log("response from back end", response);

    })
  }

  ArchiveNote = () => {
    console.log("note", this.props.note.id)
    var data = { value: this.state.value }
    notesServices.MoveToArchive(this.props.note.id, data).then(response => {
      console.log("response from back end", response);

    })
  }

  Restore = () => {

    console.log("note", this.props.note.id)
    var data = { value: !this.state.value }
    //restore from trash
    notesServices.MoveToTrash(this.props.note.id, data).then(response => {
      console.log("response from back end", response);

    })
  }
  DeleteForever = () => {
    notesServices.DeleteNote(this.props.note.id).then(response => {
      console.log("note deleted", response);

    })
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        {/* {this.props.note.isTrash ? <div className="noteiconsdiv">
          <IconButton onClick={this.DeleteForever}>
            <DeleteForeverIcon style={{ fontSize: '17' }} />
          </IconButton>
          <IconButton onClick={this.Restore}>
            <RestoreFromTrashIcon style={{ fontSize: '17' }} />
          </IconButton>
        </div> : */}
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
            <IconButton onClick={this.ArchiveNote}>
              <ArchiveOutlinedIcon style={{ fontSize: '17' }} />
            </IconButton>
            <IconButton buttonRef={node => { this.anchorEl = node; }} onClick={this.handleToggle}>
              <MoreVertIcon style={{ fontSize: '17' }} >

              </MoreVertIcon>
            </IconButton>
            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal style={{ zIndex: 1 }}>
              {({ TransitionProps }) => (
                <Grow style={{ zIndex: 1 }}
                  {...TransitionProps}
                >

                  <Card>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem onClick={this.TrashNote}>Delete note</MenuItem>
                        <MenuItem onClick={this.handleClose}>Add label</MenuItem>
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Card>

                </Grow>
              )}
            </Popper>
          </div>
      </div>
    )
  }
}

export default Icons