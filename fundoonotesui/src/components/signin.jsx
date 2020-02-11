import React, { Component } from 'react';
import { render } from '@testing-library/react';
import Card from '@material-ui/core/Card';
import '../scss/signin.scss'
import { TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SnackBar  from "react-js-snackbar";
import UserServices from '../services/UserServices';
const userservice = new UserServices();
class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {},
            errors: {},
            Show: false,
            Showing: false,
            showPassword: false
        };
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.gotoforgotpassword = this.gotoforgotpassword.bind(this);
        this.gotoregister = this.gotoregister.bind(this);
    }
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };
    handleChange(event) {


        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        });


    }
    handleSignIn(event) {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};

            fields["email"] = "";
            fields["password"] = "";

            this.setState({ fields: fields });
            console.log('submited');
            this.setState({ [event.target.setOpen]: true })
            var data = this.state.fields
            console.log("data is", data)
            userservice.Login(data).then((response) => {
                console.log("singup data after login ", response);
                // if (this.state.Showing) return;
                this.setState({ Show: !this.state.Show, Showing: !this.state.Showing });
                setTimeout(() => {
                    this.setState({ Show: false, Showing: false });
                }, 2000);
                setTimeout(() => {
                    this.props.history.push("/dashboard")
  
                }, 3000);

                
            })
        }
    }
    gotoforgotpassword() {
        this.props.history.push('/forgotpassword')
    }
    gotoregister() {
        this.props.history.push('/registration')
    }
    validateForm() {

        let fields = this.state.fields;
        console.log(fields);

        let errors = {};
        let formIsValid = true;


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


        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    render() {

        return (
            <div>
                <Card className="card">

                    <div style={{ fontSize: "1.6rem", padding: "1%", fontWeight: "bolder", fontFamily: "sarif", marginTop: "3%" }}>
                        <span style={{ color: "#3369E8" }}>F</span>
                        <span style={{ color: "#D50F25" }}>u</span>
                        <span style={{ color: "#EEB211" }}>n</span>
                        <span style={{ color: "#3369E8" }}>d</span>
                        <span style={{ color: "#009925" }}>o</span>
                        <span style={{ color: "#D50F25" }}>o</span>
                    </div>
                    <Typography variant="h5" component="div" style={{ padding: "1%" }}>
                        Sign In
                      </Typography >
                    <Typography variant="h6" component="div" style={{ padding: "1%" }}>
                        Use your Fundoo Account
                      </Typography >
                    <form noValidate autoComplete="off">
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
                                name="password"
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
                        <Button onClick={this.gotoforgotpassword} style={{ color: "dodgerblue", marginRight: '46%', marginTop: '0%' }}>
                            ForgotPassword?
                            </Button>
                    </form>

                    <div className="textfields">
                        <Button onClick={this.gotoregister} style={{ color: "dodgerblue", marginRight: '20%', marginBottom: '5%' }} >
                            Create Account
                            </Button>
                        <Button variant="contained"
                            onClick={this.handleSignIn}
                            style={{ width: '30%', backgroundColor: "dodgerblue", color: "white", marginBottom: '5%' }}>
                            Sign in
                    </Button>

                        <SnackBar Show={this.state.Show}>
                            User Logged In Successfully...
                        </SnackBar>
                    </div>
                </Card>
            </div>
        )
    }
}
export default SignIn