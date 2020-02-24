import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import '../scss/dashboard.scss'
import '../scss/label.scss'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import avatarimage from '../images/download1.jpg'
import keepimage from '../images/keep_48dp.png'
import RefreshIcon from '@material-ui/icons/Refresh';
import AppsIcon from '@material-ui/icons/Apps';
import { Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Redirect } from 'react-router-dom'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import AllLabel from '../components/Labels/AllLabel'
class DashBoard extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("logintoken")
    let loggedIn = true
    if (token == null) {
      loggedIn = false
    }
    this.state = {
      open: false,
      setOpen: false,
      openUpdate: false,
      listView:false,
      loggedIn
    };
  }
  toggle = () => {
    this.setState({ open: !this.state.open })
    // this.setState({open:true})
  }

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  logout = () => {
    localStorage.clear()
    this.props.history.push('/signin')
  }
  showArchive = () => {
    this.props.history.push('/dashboard/archive')
  }
  showAllNotes = () => {
    this.props.history.push('/dashboard/notes')
  }
  showTrash = () => {
    this.props.history.push('/dashboard/trash')
  }
  showReminder = () => {
    this.props.history.push('/dashboard/reminders')
  }
  HandleListView=()=>{
    this.setState({listView:!this.state.listView})
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />
    }
    const { open } = this.state;
    return (
      <div>
        <div>
          <Drawer open={this.state.open}>
            <ClickAwayListener onClickAway={this.handleClickAway}>
              <IconButton onClick={this.toggle} >
                {open ? (
                  <MenuIcon />
                ) : null}

              </IconButton>
            </ClickAwayListener>
            <Divider />
            <List>
              <div className="button">

                <ListItem button key="Notes" onClick={this.showAllNotes}>
                  <ListItemIcon> <EmojiObjectsOutlinedIcon /></ListItemIcon>
                  <ListItemText primary="Notes" />
                </ListItem>

              </div>
              <div className="button">

                <ListItem button key="Reminder" onClick={this.showReminder}>
                  <ListItemIcon> <NotificationsNoneSharpIcon /></ListItemIcon>
                  <ListItemText primary="Reminder" />
                </ListItem>

              </div>
            </List>
            <Divider />
            <List>
            <div className="labeltag">LABELS</div>
            <AllLabel></AllLabel>
              <ListItem button key="Edit labels">
                <ListItemIcon> <EditOutlinedIcon /></ListItemIcon>
                <ListItemText primary="Edit labels" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <div className="button">
                <ListItem button key="Archive" onClick={this.showArchive}>
                  <ListItemIcon> <ArchiveOutlinedIcon /></ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItem>
              </div>
              <div className="button">
                <ListItem button key="Trash" onClick={this.showTrash}>
                  <ListItemIcon> <DeleteOutlineOutlinedIcon /></ListItemIcon>
                  <ListItemText primary="Trash" />
                </ListItem>
              </div>
            </List>
            <Button onClick={this.logout}>Logout</Button>
          </Drawer>

        </div>
        <div>
          <AppBar
            position="fixed"
            style={{ backgroundColor: 'whitesmoke' }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.toggle}
                edge="start"

              >
                <MenuIcon style={{ color: 'black' }} />
              </IconButton>
              <div>
                <img src={keepimage} />
              </div>
              <Typography variant="h6" noWrap style={{ color: 'black' }}>
                Keep
          </Typography>
              <div className="search">
                <div className="searchIcon">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  style={{ width: '500px', marginTop: '2%' }}
                  inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton>
                  <ClearIcon />
                </IconButton>
              </div>
              <div className="iconsdiv" style={{ marginLeft: '25%' }}>
                <div className="refreshicon">
                  <IconButton>
                    <RefreshIcon />
                  </IconButton>
                </div>
                <div>
                <IconButton onClick={this.HandleListView}>
                  {this.state.listView?
                <BorderAllIcon></BorderAllIcon>:
                <ViewAgendaOutlinedIcon></ViewAgendaOutlinedIcon>
                  }
                </IconButton>
                </div>
                <div>
                  <IconButton>
                    <AppsIcon style={{ color: "dimgray" }}></AppsIcon>
                  </IconButton>
                </div>
                <div className="avatar">
                  <Avatar alt="Remy Sharp" src={avatarimage} style={{ marginLeft: '30%' }} />
                </div>
              </div>
              <div />
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }

}
export default DashBoard