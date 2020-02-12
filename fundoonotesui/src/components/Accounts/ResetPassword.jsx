import React, { Component } from 'react';
import { render } from '@testing-library/react';
import Card from '@material-ui/core/Card';
import '../../scss/signin.scss'
import { TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import UserServices from '../../services/UserServices';
import SnackBar  from "react-js-snackbar";
const userservice = new UserServices();
class ResetPassword extends Component {
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
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };
    handleChange(event) {
        // console.log('in change',event);
        
        let fields = this.state.fields;
        // console.log('==>',event.target.value,event.target.name,fields);
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        });
        console.log(fields);
        
    }
    handleResetPassword(event) {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};

            
            fields["password"] = "";

            this.setState({ fields: fields });
            console.log('submited',fields.password);
            this.setState({[event.target.setOpen]:true})
            var data = this.state.fields
        
            var token1 = this.props.match.params.token
            console.log("token 1", token1);
            
            userservice.ResetPassword(data,token1).then((response)=>{
                console.log("response",response);
                
                this.setState({ Show: !this.state.Show, Showing: !this.state.Showing });
                setTimeout(() => {
                    this.setState({ Show: false, Showing: false });
                }, 2000);
            }
            )

        }
    }
    validateForm() {

        let fields = this.state.fields;
        console.log(fields);
        
        let errors = {};
        let formIsValid = true;

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
                    </form>

                    <div className="textfields">
                    
                        <Button variant="contained"
                            onClick={this.handleResetPassword}
                            style={{ width: '40%', backgroundColor: "dodgerblue", color: "white", marginBottom: '5%' }}>
                           Reset password
                    </Button>
                    <SnackBar Show={this.state.Show}>
                            password changed Successfully...
                        </SnackBar>
                    </div>
                </Card>
            </div>
        )
    }
}
export default ResetPassword