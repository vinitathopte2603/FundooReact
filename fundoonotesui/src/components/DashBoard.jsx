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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import '../scss/dashboard.scss'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import avatarimage from '../images/download1.jpg'
import keepimage from '../images/keep_48dp.png'
import RefreshIcon from '@material-ui/icons/Refresh';
import AppsIcon from '@material-ui/icons/Apps';
import AllNotes from './AllNotes'
import { Button } from '@material-ui/core';
import {Redirect} from 'react-router-dom'
class DashBoard extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("logintoken")
    let loggedIn=true
    if(token == null){
      loggedIn=false
    }
    this.state = {
      open: false,
      setOpen: false,
      openUpdate:false,
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
  forRefresh(){
  
     window.location.reload(false);
  }
  logout=()=>{
    localStorage.clear()
    this.props.history.push('/signin')
  }
  render() {
    if(this.state.loggedIn===false){
      return <Redirect to="/"/>
    }
    const { open } = this.state;
    return (
      <div >
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
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
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
                <img src={keepimage}/>
              </div>
              <Typography variant="h6" noWrap style={{ color: 'black' }}>
               Fundoo keep
          </Typography>
              <div className="search">
                <div className="searchIcon">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  style={{ marginRight: '60%'}}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className="iconsdiv" style={{marginLeft:'25%'}}>
              <div className="refreshicon">
                <IconButton onClick={this.forRefresh}>
                <RefreshIcon />
                </IconButton>
              </div>
              <div>
                <IconButton>
                <AppsIcon style={{color:"dimgray"}}></AppsIcon>
                </IconButton>
              </div>
              <div className="avatar">
                <Avatar alt="Remy Sharp" src={avatarimage} style={{marginLeft:'30%'}}/>
              </div>
              </div>
              <div />
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ marginTop: '8%' }}>welcome to dashboard</div>
        <AllNotes refresh={this.forRefresh}></AllNotes>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }

}
export default DashBoard