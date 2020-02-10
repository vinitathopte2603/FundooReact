import React, { Component } from 'react';
import { render } from '@testing-library/react';
import Card from '@material-ui/core/Card';
import '../scss/registration.scss'
import '../scss/signin.scss'
import { TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserServices from '../services/UserServices'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//import ReactSnackBar from "react-js-snackbar";

const userservice = new UserServices();
class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Show: false,
            Showing: false,
            fields: {},
            errors: {},
            showPassword: false
        };
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.gotosignin = this.gotosignin.bind(this);
    }
    gotosignin() {
        this.props.history.push('/signin')
    }
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };
    handleChange(event) {

        let fields = this.state.fields;
        // console.log('==>',event.target.value,event.target.name,fields);
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        });
        console.log(fields);

    }
    handleRegistration(event) {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};

            fields["FirstName"] = "";
            fields["LastName"] = "";
            fields["Email"] = "";
            fields["Passwrod"] = "";
            fields["Type"] = "";


            this.setState({ fields: fields });
            console.log('in register', this.state.fields);

            console.log('submited');
            this.setState({ [event.target.setOpen]: true })
            var data = this.state.fields
            console.log("data is", data)
            userservice.Register(data).then((response) => {
                console.log("singup data after registraion ", response);
                // if (this.state.Showing) return;

                // this.setState({ Show: true, Showing: true });
                // setTimeout(() => {
                //     this.setState({ Show: false, Showing: false });
                // }, 2000);

                this.props.history.push("/signin")

            }
            )
        }
    }
    validateForm() {

        let fields = this.state.fields;
        console.log(fields);

        let errors = {};
        let formIsValid = true;


        if (!fields["firstName"]) {
            formIsValid = false;
            errors["firstName"] = "*Please enter your first name.";
        }
        if (typeof fields["firstName"] !== "undefined") {
            var pattern = new RegExp(/^[A-Z][a-zA-Z]*$/)
            if (!pattern.test(fields["firstName"])) {
                formIsValid = false;
                errors["firstName"] = "*Please enter first name in correct format"
            }
        }

        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "*Please enter your last name.";
        }
        if (typeof fields["lastName"] !== "undefined") {
            var pattern = new RegExp(/^[A-Z][a-zA-Z]*$/)
            if (!pattern.test(fields["lastName"])) {
                formIsValid = false;
                errors["lastName"] = "*Please enter last name in correct format"
            }
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }


        if (!fields["passwrod"]) {
            formIsValid = false;
            errors["passwrod"] = "*Please enter your password.";
        }

        if (typeof fields["passwrod"] !== "undefined") {
            if (!fields["passwrod"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["passwrod"] = "*Please enter secure and strong password.";
            }
        }

        // if (!fields["type"]) {
        //     formIsValid = false;
        //     errors["type"] = "*Please enter your user type.";
        // }
        // if (typeof fields["type"] !== "undefined") {
        //     var pattern = new RegExp(/^[A-Z][a-zA-Z]*$/)
        //     if (!pattern.test(fields["firstName"])) {
        //         formIsValid = false;
        //         errors["type"] = "*Please enter user type in correct format"
        //     }
        // }
        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    render() {

        return (
            <div>
                <Card className="cardregistration">

                    <div style={{ fontSize: "1.6rem", padding: "1%", fontWeight: "bolder", fontFamily: "sarif", marginTop: "3%" }}>
                        <span style={{ color: "#3369E8" }}>F</span>
                        <span style={{ color: "#D50F25" }}>u</span>
                        <span style={{ color: "#EEB211" }}>n</span>
                        <span style={{ color: "#3369E8" }}>d</span>
                        <span style={{ color: "#009925" }}>o</span>
                        <span style={{ color: "#D50F25" }}>o</span>
                    </div>
                    <Typography variant="h5" component="div" style={{ padding: "1%" }}>
                        Register
                      </Typography >
                    <Typography variant="h6" component="div" style={{ padding: "1%" }}>
                        Create your Fundoo Account
                      </Typography >
                    <form noValidate autoComplete="off">
                        <div className="nametextfields">
                        <div className="textfieldsregistration" >
                            <TextField required id="outlined-basic"
                                name="firstName"
                                label="firstName"
                                onChange={this.handleChange}
                                variant="outlined"
                                style={{ width: '80%' }}
                                InputProps={
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }
                                }
                            />
                            <div className="errorMsgregistration">{this.state.errors.firstName}</div>
                        </div>
                        
                        {/* <div div className="textfieldsregistration"> */}
                            <TextField required id="outlined-basic"
                                name="lastName"
                                label="lastName"
                                onChange={this.handleChange}
                                variant="outlined"
                                style={{ width: '80%' }}
                                InputProps={
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }
                                }
                            />
                            <div className="errorMsg">{this.state.errors.lastName}</div>
                        </div>
                        {/* </div> */}
                       
                        <div className="textfields">
                            <TextField required id="outlined-basic"
                                name="email"
                                label="email"
                                onChange={this.handleChange}
                                variant="outlined"
                                style={{ width: '80%' }}
                                InputProps={
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }
                                }
                            />
                        </div>
                        <div className="errorMsg">{this.state.errors.email}</div>
                        <div className="textfields ">
                            <TextField
                                required
                                id="outlined-basic"
                                name="passwrod"
                                label="password"
                                onChange={this.handleChange}
                                type={this.state.showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                edge="end"
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                style={{ width: '80%' }}
                            />
                        </div>
                        <div className="errorMsg">{this.state.errors.password}</div>
                        <div className="textfields">
                            {/* <TextField required id="outlined-basic"
                                name="type"
                                label="type"
                                onChange={this.handleChange}
                                variant="outlined"
                                style={{ width: '80%' }}
                                InputProps={
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }
                                }
                            /> */}


                            <RadioGroup row aria-label="type" name="Type" onChange={this.handleChange}>
                                <FormControlLabel
                                    style={{ color: "dodgerblue", marginLeft:'20%' }}
                                    value="Basic"
                                    control={<Radio color="dodgerblue" />}
                                    label="Basic"
                                    labelPlacement="start"
                                />
                        
                                <FormControlLabel
                                    style={{ color: "dodgerblue",marginLeft:'20%' }}
                                    value="Advance"
                                    control={<Radio color="dodgerblue" />}
                                    label="Advance"
                                    labelPlacement="start"
                                />
                             </RadioGroup> 
                        </div>
                    </form>

                    <div className="textfields">

                        <Button variant="contained"
                            onClick={this.handleRegistration}

                            style={{ width: '30%', backgroundColor: "dodgerblue", color: "white", marginBottom: '5%' }}>
                            Register
                    </Button>
                        {/* <Button variant="contained"
                            onClick={this.gotosignin}

                            style={{ width: '30%', backgroundColor: "dodgerblue", color: "white", marginBottom: '5%' }}>
                            Sign In
                    </Button> */}
                        {/* <ReactSnackBar Show={this.state.Show}>
                            User Logged In   Successfully...
                        </ReactSnackBar> */}
                    </div>
                </Card>
            </div>
        )
    }
}
export default Registration