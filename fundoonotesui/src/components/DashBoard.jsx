import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import '../scss/dashboard.scss'

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false
    };
  }
 
  render() {
    return (
      <div >
        <AppBar position="static" style={{ backgroundColor: 'whitesmoke' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon style={{ color: 'black' }} onClick={this.handleClick} />
            </IconButton>
            <Typography variant="h6" noWrap style={{ color: 'black' }}>
              Keep
          </Typography>
            <div className="search">
              <div className="searchIcon">
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                style={{ backgroundColor: 'whitesmoke' }, { marginRight: '60%' }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default DashBoard