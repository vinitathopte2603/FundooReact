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
import { Card, Paper } from '@material-ui/core';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NoteServices from '../services/NoteServices';
import Tooltip from '@material-ui/core/Tooltip';
import Collaborate from '../components/Collaborate'
import '../scss/changebackgroundcolor.scss'


const notesServices = new NoteServices()


class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: true,
      changeColor: false,
      image: null,
      collab: null,
      colors: [{ color: "#d7aefb" }, { color: "#fdcfe8" }, { color: "#e6c9a8" }, { color: "#e8eaed" },
      { color: "#ccff90" }, { color: "#a7ffeb" }, { color: "#cbf0f8" }, { color: "#aecbfa" },
      { color: "#f28b82" }, { color: "#fbbc04" }, { color: "#fff475" }, { color: "#fff" }],
      clr: ''

    }

  }

  handleClosecolor = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ changeColor: false });
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
  handleToggleChangeColor = () => {
    this.setState({ changeColor: !this.state.changeColor });

  };
  TrashNote = () => {

    let data = { value: true }


    notesServices.MoveToTrash(this.props.note.id, data).then(response => {

      this.props.parentCallback();
    })
  }

  ArchiveNote = () => {

    if (this.props.note.isArchive) {
      let data = { value: false }
      notesServices.MoveToArchive(this.props.note.id, data).then(response => {

        this.props.parentCallback();


      })
    }
    else {
      let data = { value: true }
      notesServices.MoveToArchive(this.props.note.id, data).then(response => {

        this.props.parentCallback();


      })
    }

  }

  Restore = () => {


    var data = { value: false }


    //restore from trash
    notesServices.MoveToTrash(this.props.note.id, data).then(response => {

      this.props.parentCallback();
    })
  }
  DeleteForever = () => {
    notesServices.DeleteNote(this.props.note.id).then(response => {

      this.props.parentCallback();
    })
  }
  changeBackgroundcolor = (data) => {
    var clrdata = {
      color: data
    }

    notesServices.ChangeColour(clrdata, this.props.note.id).then(response => {

      this.props.parentCallback();
    })
  }
  imageUpload = async (event) => {
    await this.setState({
      image: event.target.files[0]
    })
    console.log("here", this.state.image);
    const formdata = new FormData();
    formdata.append('ImageUrl', this.state.image)
    console.log("note id", this.props.note.id);

    notesServices.ImageUpload(formdata, this.props.note.id).then(response => {
      console.log("image uploaded successfully", response.data.imageUrl);

    })
  }
  Collaborate = () => {
    this.setState({ collab: !this.state.collab })
  }
 
  render() {
  
    const colour = this.state.colors.map((item, index) => {
      return (
        <div key={index}>

          <div className="colorStyle">
            <IconButton style={{ backgroundColor: item.color }}
              onClick={() => this.changeBackgroundcolor(item.color)}
            />
          </div>

        </div>
      )
    })
    const { open } = this.state;


    return (
      <div >
        {this.props.note.isTrash ? <div className="noteiconsdiv" >
          <Tooltip title="Delete">
            <IconButton onClick={this.DeleteForever}>
              <DeleteForeverIcon style={{ fontSize: '17' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Restore">
            <IconButton onClick={this.Restore}>
              <RestoreFromTrashIcon style={{ fontSize: '17' }} />
            </IconButton>
          </Tooltip>
        </div> :
      
          <div className="noteiconsdiv">
            <Tooltip title="Remind me">
              <IconButton >
                <AddAlertOutlinedIcon style={{ fontSize: '17' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Collaborator">
              <IconButton onClick={this.Collaborate} >
                <PersonAddOutlinedIcon style={{ fontSize: '17' }} />
              </IconButton>
            </Tooltip>
            {this.state.collab ?
            <Collaborate noteid={this.props.note.id}></Collaborate>: null
            }
            <Tooltip title="Change color">
              <IconButton onClick={this.handleToggleChangeColor}>
                <PaletteOutlinedIcon style={{ fontSize: '17' }} />
              </IconButton>
            </Tooltip>

            <Paper>
              {this.state.changeColor ?
                <ClickAwayListener onClickAway={this.handleClosecolor}>
                  <Card className="colorpalettecard">
                    {colour}
                  </Card>
                </ClickAwayListener>
                : null}
            </Paper>
            <Tooltip title="Add image">
              <div>
                <input accept="image/*" style={{ display: 'none' }} id={this.props.note.id} type="file"
                  onChange={this.imageUpload} />
                <label htmlFor={this.props.note.id}>
                  <IconButton component="span">
                    <ImageOutlinedIcon style={{ fontSize: '17' }} />
                  </IconButton>
                </label>
              </div>
            </Tooltip>
            <Tooltip title="Archive">

              <IconButton onClick={this.ArchiveNote}>
                <ArchiveOutlinedIcon style={{ fontSize: '17' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="More">
              <IconButton buttonRef={node => { this.anchorEl = node; }} onClick={this.handleToggle}>
                <MoreVertIcon style={{ fontSize: '17' }} >
                </MoreVertIcon>
              </IconButton>
            </Tooltip>

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