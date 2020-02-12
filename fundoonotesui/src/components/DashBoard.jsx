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
class Demo extends Component {
  constructor(props){
    super(props);
    this.state={
      open : false,
      setOpen : false
    };
  }
  toggle=()=>{
    this.setState({open:!this.state.open})
    // this.setState({open:true})
  }

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };
render(){
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
        style={{backgroundColor:'whitesmoke'}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.toggle}
            edge="start"
  
          >
            <MenuIcon style={{color:'black'}}/>
          </IconButton>
          <Typography variant="h6" noWrap style={{color:'black'}}>
           Keep
          </Typography>
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
             style={{backgroundColor:'whitesmoke'}, {marginRight:'60%'}}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{marginLeft:'50%'}} />
          </div>
          <div/>
        </Toolbar>
      </AppBar>
     </div>
      <div style={{marginTop:'8%'}}>welcome to dashboard</div>
    </div>
  );
}
 
}
export default Demo