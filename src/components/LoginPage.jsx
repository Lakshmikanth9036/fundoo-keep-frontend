import React, { Component } from 'react'
import '../css/login.scss'
import UserService from '../service/UserService'
import { Link } from 'react-router-dom'
import { TextField, InputAdornment, InputLabel, FormControl, OutlinedInput, IconButton, Card } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

class LoginPage extends Component {

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



    submitHandler = e => {
        e.preventDefault()
        if (this.isValidForm()) {
            let fields = {}
            fields["mailOrMobile"] = ""
            fields["password"] = ""
            this.setState({ fields: fields })
            UserService.loginService(this.state.fields)
                .then(response => {
                     localStorage.setItem('response', JSON.stringify(response.data))
                    console.log(response.data)
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    changeHandler = e => {
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        })
    }

    handleClickShowPassword = () => {
        let showPassword = !this.state.showPassword
        this.setState({ showPassword })
    }

    isValidForm() {
        let fields = this.state.fields
        let errors = {}
        let formIsValid = true

        if (!fields["mailOrMobile"]) {
            formIsValid = false
            errors["mailOrMobile"] = "*Please enter your mail id or moblie"
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        this.setState({
            errors: errors
        })

        return formIsValid
    }

    render() {
        const { mailOrMobile, password } = this.state.fields
        const {errors} = this.state
        const { showPassword } = this.state
        return (
            <div>
                <Card className='login' variant="outlined">
                <h3>Sign in</h3>
                <form onSubmit={this.submitHandler}>
                        {/* <input type='text' name="emailAddress" value={emailAddress} onChange={this.changeHandler} placeholder="Email" /> */}
                        <TextField
                            className="margin"
                            name="mailOrMobile"
                            value={mailOrMobile}
                            onChange={this.changeHandler}
                            label="Email or Mobile"
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
                        <div className="errorMsg">{errors.mailOrMobile}</div>
                        {/* <input type='password' name="password" value={password} onChange={this.changeHandler} placeholder='Password' /> */}
                        <FormControl className="margin" variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
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
                        {/* <button type='submit'>Login</button> */}
                        <Link className='PrDSKc' to="/forgotPassword">Forgot password?</Link><br/>
                        <Button className='btnn2' href="/" >Sigin Up</Button>
                        <Button className='btnn1' type='submit' color="primary" variant='contained'>Signin</Button>
                </form>
                </Card>
            </div>
        );

    }
}
export default LoginPage
