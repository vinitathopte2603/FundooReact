import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import '../../scss/signin.scss'
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import UserServices from '../../services/UserServices';
import ReactSnackBar from 'react-js-snackbar';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
const userservice = new UserServices();
const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: 'aliceblue',
    },
    barColorPrimary: {
      backgroundColor: 'dodgerblue',
    },
  })(LinearProgress);
class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {},
            errors: {},
            Show: false,
            Showing: false,
            linearProgress:false,
        };
       
        this.handleChange = this.handleChange.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
    }
    
    handleChange(event) {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        });
    }
    handleForgotPassword(event) {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["email"] = "";
            this.setState({ fields: fields });
            
            this.setState({linearProgress:true})
            this.setState({[event.target.setOpen]:true})
            var data =this.state.fields
            
            userservice.ForgotPassword(data).then((response)=>{
            
                 if (this.state.Showing) return;

                 this.setState({ Show: true, Showing: true });
                 setTimeout(() => {
                     this.setState({ Show: false, Showing: false });
                 }, 2000);
                
            })
        }
    }
    validateForm() {

        let fields = this.state.fields;
        
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


      

        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    render() {

        return (
            <div>
                <Card className="card" variant="outlined">
                {this.state.linearProgress?<ColorLinearProgress/>:null}
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
                    </form>

                    <div className="textfields">
              
                        <Button variant="contained"
                            onClick={this.handleForgotPassword}
                            style={{ width: '40%', backgroundColor: "dodgerblue", color: "white", marginBottom: '5%' }}>
                           Forgot Password
                    </Button>
                    <ReactSnackBar Show={this.state.Show}>
                            mail sent to your registered email
                        </ReactSnackBar> 
                    </div>
                </Card>
            </div>
        )
    }
}
export default ForgotPassword