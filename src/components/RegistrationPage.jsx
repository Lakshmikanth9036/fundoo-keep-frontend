import React, { Component } from 'react'
import '../css/register.scss'
import axios from 'axios'
import Constants from '../constants/Constants'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import ContactPhoneRoundedIcon from '@material-ui/icons/ContactPhoneRounded';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import UserService from '../service/UserService'

class RegistrationPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fields: {},
            errors: {},
            showPassword: false
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: 200,
        },
    }));

    changeHandler = (e) => {
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        })
    }

    submitHandler(e) {
        e.preventDefault();
        if (this.isValidForm()) {
            let fields = {};
            fields["username"] = "";
            fields["emailid"] = "";
            fields["mobileno"] = "";
            fields["password"] = "";
            this.setState({ fields: fields });
            UserService.registrationService(this.state.fields)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    handleClickShowPassword = () => {
        let showPassword = !this.state.showPassword
        this.setState({ showPassword })
    }

    isValidForm() {
        let fields = this.state.fields
        let errors = {}
        let formIsValid = true

        if (!fields["firstName"]) {
            formIsValid = false
            errors["firstName"] = "*Please enter your first name"
        }

        if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["firstName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["lastName"]) {
            formIsValid = false
            errors["lastName"] = "*Please enter your last name"
        }

        if (typeof fields["lastName"] !== "undefined") {
            if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["lastName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["emailAddress"]) {
            formIsValid = false;
            errors["emailAddress"] = "*Please enter your email-ID.";
        }

        if (typeof fields["emailAddress"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailAddress"])) {
                formIsValid = false;
                errors["emailAddress"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["mobile"]) {
            formIsValid = false;
            errors["mobile"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobile"] !== "undefined") {
            if (!fields["mobile"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobile"] = "*Please enter valid mobile no.";
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
        })
        return formIsValid
    }


    render() {
        const { fields, errors } = this.state
        const { showPassword } = this.state
        return (
            <div>
                <Card className='register' variant="outlined">
                    <div>
                        <h2>Fondoo</h2>
                    <h3>Sign Up</h3>
                    </div>
                    <form method="post" onSubmit={this.submitHandler}>
                        {/* <input type='text' name="firstName" value={fields.firstName} onChange={this.changeHandler} placeholder='First Name' /> */}
                        <TextField
                            className={this.useStyles.margin}
                            name="firstName"
                            value={fields.firstName}
                            onChange={this.changeHandler}
                            label="FirstName"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorMsg">{errors.firstName}</div>
                        {/* <input type='text' name="lastName" value={fields.lastName} onChange={this.changeHandler} placeholder='Last Name' /> */}
                        <TextField
                            className={this.useStyles.margin}
                            name="lastName"
                            value={fields.lastName}
                            onChange={this.changeHandler}
                            label="LastName"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorMsg">{errors.lastName}</div>
                        {/* <input type='text' name="emailAddress" value={fields.emailAddress} onChange={this.changeHandler} placeholder="Email" /> */}
                        <TextField
                            className={this.useStyles.margin}
                            name="emailAddress"
                            value={fields.emailAddress}
                            onChange={this.changeHandler}
                            label="Email"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorMsg">{errors.emailAddress}</div>
                        {/* <input type='text' name="mobile" value={fields.mobile} onChange={this.changeHandler} placeholder='Mobile No.' /> */}
                        <TextField
                            className={this.useStyles.margin}
                            name="mobile"
                            value={fields.mobile}
                            onChange={this.changeHandler}
                            label="MobileNo."
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ContactPhoneRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorMsg">{errors.mobile}</div>
                        {/* <input type='password' name="password" value={fields.password} onChange={this.changeHandler} placeholder='Password' /> */}
                        <FormControl variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={fields.password}
                                onChange={this.changeHandler}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            edge="end">
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className="errorMsg">{errors.password}</div>
                        {/* <button type='submit' >Submit</button> */}
                        <Button className='btn2' href="/login" >Signin</Button>
                        <Button className='btn1'  type='submit' color="primary" variant='contained'>Signup</Button>
                    </form>
                </Card>
            </div>
        )
    }
}

export default RegistrationPage


