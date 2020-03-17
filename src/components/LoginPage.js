import React, { Component } from 'react'
import axios from 'axios'
import Constants from '../constants/Constants'
import '../css/login.scss'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, InputLabel, FormControl, OutlinedInput, IconButton } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';
import ContactPhoneRoundedIcon from '@material-ui/icons/ContactPhoneRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
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

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: '',
            mobile: '',
            password: ''
        }
        this.showPassword =  false
    }

    

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.put(Constants.loginApi, this.state)
            .then(response => {
                localStorage.setItem('response', response.data)
                console.log(response)
            }).catch(error => {
                console.log('err')
            })
    }

changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
}

render() {
    const { emailAddress, mobile, password } = this.state
    return (
        <div>
            <form onSubmit={this.submitHandler}>
                <div className='root'>
                    {/* <input type='text' name="emailAddress" value={emailAddress} onChange={this.changeHandler} placeholder="Email" /> */}
                    <TextField
                            className="margin"
                            name="emailAddress"
                            value={emailAddress}
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
                    <h3>----------------Or---------------</h3>
                    {/* <input type='text' name="mobile" value={mobile} onChange={this.changeHandler} placeholder='Mobile No.' /> */}
                    <TextField
                            className="margin"
                            name="mobile"
                            value={mobile}
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
                    {/* <input type='password' name="password" value={password} onChange={this.changeHandler} placeholder='Password' /> */}
                    {/* <FormControl variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
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
                        </FormControl> */}
                    <button type='submit'>Login</button>
                    <Link to="/" >Registration</Link>
                </div>
            </form>
        </div>
    );

    }
}
export default LoginPage
