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
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
const notesServices = new NoteServices()


class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: true,
      changeColor: false

    }
  }

  handleClosePalette = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ changeColor: false });
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleToggleChangeColor = () => {
    this.setState(state => ({ changeColor: !state.changeColor }));
    console.log("change color",this.state.changeColor)
  };
  TrashNote = () => {
    console.log("note", this.props.note.id)
    let data = { value: true }
    console.log("trash the note", data);

    notesServices.MoveToTrash(this.props.note.id, data).then(response => {
      console.log("response from back end", response);
      this.props.parentCallback();
    })
  }

  ArchiveNote = () => {
    console.log("note", this.props.note.id)
    if (this.props.note.isArchive) {
      let data = { value: false }
      notesServices.MoveToArchive(this.props.note.id, data).then(response => {
        console.log("response from back end", response);
        this.props.parentCallback();
        console.log("parent call back", this.props.parentCallback);

      })
    }
    else {
      let data = { value: true }
      notesServices.MoveToArchive(this.props.note.id, data).then(response => {
        console.log("response from back end", response);
        this.props.parentCallback();
        console.log("parent call back", this.props.parentCallback);

      })
    }

  }

  Restore = () => {

    console.log("note", this.props.note.id)
    var data = { value: false }
    console.log("restore", data);

    //restore from trash
    notesServices.MoveToTrash(this.props.note.id, data).then(response => {
      console.log("response from back end", response);
      this.props.parentCallback();
    })
  }
  DeleteForever = () => {
    notesServices.DeleteNote(this.props.note.id).then(response => {
      console.log("note deleted", response);
      this.props.parentCallback();
    })
  }

  render() {
    const { open } = this.state;
    const { changeColor } = this.state;
    return (
      <div>
        {this.props.note.isTrash ? <div className="noteiconsdiv">
          <IconButton onClick={this.DeleteForever}>
            <DeleteForeverIcon style={{ fontSize: '17' }} />
          </IconButton>
          <IconButton onClick={this.Restore}>
            <RestoreFromTrashIcon style={{ fontSize: '17' }} />
          </IconButton>
        </div> :
          <div className="noteiconsdiv">
            <IconButton >
              <AddAlertOutlinedIcon style={{ fontSize: '17' }} />
            </IconButton>
            <IconButton>
              <PersonAddOutlinedIcon style={{ fontSize: '17' }} />
            </IconButton>

            <IconButton buttonRef={node => { this.anchorEl = node; }} onClick={this.handleToggleChangeColor}>
              <PaletteOutlinedIcon style={{ fontSize: '17' }} />
            </IconButton>
            <Popper changeColor={changeColor} anchorEl={this.anchorEl} transition disablePortal style={{ zIndex: 1 }}>
              {({ TransitionProps }) => (
                <Grow style={{ zIndex: 1 }}
                  {...TransitionProps}
                >

                  <Card>
                    <ClickAwayListener onClickAway={this.handleClosePalette}>
                      <MenuList>
                        <MenuItem >jukgbhjbj</MenuItem>
                        <MenuItem >Add label</MenuItem>
                        <MenuItem >Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Card>

                </Grow>
              )}
            </Popper>
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
              
                      </MenuList>
                    </ClickAwayListener>
                  </Card>

                </Grow>
              )}
            </Popper>
          </div>}

      </div>
    )

  }
}

export default Icons