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
import { Button, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Redirect } from 'react-router-dom'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import AllLabel from '../components/Labels/AllLabel'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const drawertheme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: 65
      }
    }
  }
});
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
      listView: false,
      loggedIn,
      isNotes: true,
      isReminder: false,
      isArchive: false,
      isTrash: false,
      profile: false

    };
  }
  toggle = () => {
    this.setState({ open: !this.state.open })

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
    this.setState({ isArchive: true, isNotes: false, isReminder: false, isTrash: false })
    this.props.history.push('/u/0/archive')
  }
  showAllNotes = () => {
    this.setState({ isNotes: true, isReminder: false, isTrash: false, isArchive: false })
    this.props.history.push('/u/0/notes')
  }
  showTrash = () => {
    this.setState({ isTrash: true, isNotes: false, isReminder: false, isArchive: false })
    this.props.history.push('/u/0/trash')
  }
  showReminder = () => {
    this.setState({ isReminder: true, isNotes: false, isArchive: false, isTrash: false })
    this.props.history.push('/u/0/reminders')
  }
  HandleListView = () => {
    this.setState({ listView: !this.state.listView })
  }
  profileupload = () => {
    this.setState({ profile: !this.state.profile })
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />
    }

    return (
      <div>

        <div className="appbar">

          <AppBar
            position="fixed"
            style={{ backgroundColor: 'whitesmoke', zIndex: 1 }}
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
              {this.state.isNotes ?

                <div style={{ display: 'flex' }}>
                  <img src={keepimage} />

                  <Typography variant="h6" noWrap style={{ color: 'black', marginTop: '7px' }}>
                    Keep
          </Typography></div> : null}||{this.state.isReminder ? <div>
                <Typography variant="h6" noWrap style={{ color: 'black' }}>
                  Remainder
          </Typography></div> : null}||{
                this.state.isArchive ? <div>
                  <Typography variant="h6" noWrap style={{ color: 'black' }}>
                    Archive
      </Typography></div> : null
              }||{this.state.isTrash ? <div>
                <Typography variant="h6" noWrap style={{ color: 'black' }}>
                  Trash
    </Typography></div> : null}
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
                    {this.state.listView ?
                      <BorderAllIcon></BorderAllIcon> :
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
                  <IconButton onClick={this.profileupload}>
                    <Avatar alt="Dash" src={avatarimage} style={{ marginLeft: '30%' }} />
                  </IconButton>
                </div>
              </div>
              <div />
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <ThemeProvider theme={drawertheme}>
            <Drawer open={this.state.open}
              variant="persistent" >

              <Divider />
              <div>
                <List >
                  <div className="button">

                    <ListItem button key="Notes" onClick={this.showAllNotes}>
                      <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
                      <ListItemText primary="Notes" />
                    </ListItem>

                  </div>
                  <div className="button">

                    <ListItem button key="Reminder" onClick={this.showReminder}>
                      <ListItemIcon><NotificationsNoneSharpIcon /></ListItemIcon>
                      <ListItemText primary="Reminder" />
                    </ListItem>
                  </div>
                </List>
              </div>
              <Divider />

              <List>

                <div className="labeltag">LABELS</div>
                {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
                <AllLabel props={this.props}></AllLabel>
                {/* </ClickAwayListener> */}

              </List>

              <Divider />
              <List>
                <div className="button">
                  <ListItem button key="Archive" onClick={this.showArchive}>
                    <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Archive" />
                  </ListItem>
                </div>
                <div className="button">
                  <ListItem button key="Trash" onClick={this.showTrash}>
                    <ListItemIcon><DeleteOutlineOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Trash" />
                  </ListItem>
                </div>
              </List>
              <Button onClick={this.logout}>Logout</Button>
              <Divider />
              <div style={{ marginBottom: '90px' }}>
                Privacy · Terms
                <div>
                  Open-source licenses
                </div>
              </div>
            </Drawer>
          </ThemeProvider>
        </div>

      </div>
    );
  }

}
export default DashBoard