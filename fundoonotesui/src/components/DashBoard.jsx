import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import '../scss/dashboard.scss'
import '../scss/label.scss'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import keepimage from '../images/keep_48dp.png'
import RefreshIcon from '@material-ui/icons/Refresh';
import AppsIcon from '@material-ui/icons/Apps';
import { Button, Paper, Popover, Dialog, Card } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Redirect } from 'react-router-dom'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import AllLabel from '../components/Labels/AllLabel'
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import UserServices from '../services/UserServices'
import { connect } from 'react-redux';

const userService = new UserServices()
const drawertheme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: 70
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
      profile: false,
      anchorEl: null,
      imageFile: null,
      imagecrop: false,
      crop: {
        unit: '%',
        width: 30,
        aspect: 1 / 1,
      },
      keyword: ''

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
    localStorage.removeItem("logintoken")
    this.props.history.push('/signin')
  }
  showArchive = () => {
    this.setState({ isArchive: true, isNotes: false, isReminder: false, isTrash: false })
    this.props.history.push('/u/0/archive')
  }
  showAllNotes = () => {
    this.setState({ isNotes: true, isReminder: false, isTrash: false, isArchive: false, keyword: '' })
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

  profileupload = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ imageFile: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  imageCrop = () => {
    this.setState({
      imagecrop: !this.state.imagecrop
    })
  }
  closeimagecrop = () => {
    this.setState({ imagecrop: false })
  }

  profilepicture = () => {
    const formdata = new FormData();
    formdata.append('ImageUrl', this.state.imageFile1)
    userService.profilePicture(formdata).then(response => {
      console.log("profile uploaded successfully", response.data.imageUrl);
      localStorage.setItem("imageurl", response.data.imageUrl)
    })

  }
  onImageLoaded = image => {
    this.imageRef = image
    console.log('onCropComplete', image)
  }

  onCropComplete = crop => {
    this.MakeClientCrop(crop)
    console.log('onCropComplete', crop)
  }

  onCropChange = crop => {
    this.setState({ crop: crop })
    console.log("imager cropped");

  }
  async MakeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      

      this.setState({ imageFile1: croppedImageUrl });
    }
  }
  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        if (!blob) {

          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
  }
  OnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    const data = {
      keyword: e.target.value
    }
    this.props.dispatch({
      type: 'SEARCH',
      data
    });
    this.props.history.push(`/u/0/search/${e.target.value}`)
  }
  homepage = () => {
    this.props.history.push('/u/0/notes')
  }

  render() {


    if (this.state.loggedIn === false) {
      return <Redirect to="/" />
    }
    const { anchorEl } = this.state;
    const openpopover = Boolean(anchorEl);
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
                  <div >
                    <Avatar variant="square" src={keepimage} style={{ height: '41px', width: '41px' }} />
                  </div>
                  <div>
                    <Typography variant="h6" noWrap style={{ color: 'black', marginTop: '7px' }}>
                      Keep
          </Typography></div></div> : null}||{this.state.isReminder ? <div>
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
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.OnChange}
                
                />
                <IconButton onClick={this.homepage}>
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
                <div>
                  <IconButton onClick={this.profileupload}>
                    <Avatar alt={localStorage.getItem("first")} src={localStorage.getItem("imageurl")}
                      style={{ marginLeft: '30%', height: '41px', width: '41px' }} />
                  </IconButton>
                  <div>
                    <Popover open={openpopover}
                      anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }} onClose={this.handleClose}>
                      <div>
                        <Paper style={{ height: '310px', width: '310px' }}>
                          <div style={{ marginLeft: '35%', marginTop: '5%' }}>
                            <Badge
                              overlap="circle"
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                              badgeContent={
                                <div>

                                  <IconButton onClick={this.imageCrop}>
                                    <PhotoCameraOutlinedIcon />
                                  </IconButton>

                                </div>}
                            >
                              {this.state.imagecrop ? <Dialog open={this.state.imagecrop} onClose={this.closeimagecrop}>

                                <Card style={{ height: '500px', width: '500px' }} >
                                  <div className="imagecrop" >
                                    <div className="selectprofile">
                                      Select profile photo
                                    </div>
                                    <ClearIcon onClick={this.closeimagecrop}></ClearIcon>
                                  </div>
                                  <div className="crop">
                                    <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file"
                                      onChange={this.handleImageChange} />
                                    <label htmlFor="icon-button-file">
                                      <Button component="span" >
                                        Select a photo from your computer
                                  </Button>
                                    </label>

                                    <ReactCrop
                                      src={this.state.imageFile}
                                      crop={this.state.crop}
                                      onImageLoaded={this.onImageLoaded}
                                      onComplete={this.onCropComplete}
                                      onChange={this.onCropChange}
                                    />
                                  </div>
                                  <Button onClick={this.profilepicture}>
                                    Set as profile photo
                                </Button>
                                </Card>

                              </Dialog> : null}
                              <Avatar src={localStorage.getItem("imageurl")} style={{ height: '86px', width: '86px' }}></Avatar>
                            </Badge>
                          </div>
                          <div style={{ marginLeft: '33%', fontSize: '23px' }}>
                            {localStorage.getItem("first")}
                          </div>
                          <div style={{
                            marginTop: '7px',
                            marginLeft: '26%'
                          }}>
                            {localStorage.getItem("email")}
                          </div>

                          <div className="logoutbutton">
                            <div className="imageuploadbutton">
                              <Button variant="outlined" onClick={this.logout}>Logout</Button>
                            </div>
                          </div>

                        </Paper>
                      </div>
                    </Popover>
                  </div>
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
export default connect()(DashBoard)