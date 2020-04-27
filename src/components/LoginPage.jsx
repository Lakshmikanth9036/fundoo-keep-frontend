import React, { Component } from 'react'
import '../css/login.scss'
import UserService from '../service/UserService'
import { TextField, InputAdornment, IconButton, Card } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mailOrMobile:'',
            password:'',
            isValidPassword:false,
            isMailOrMobile:false,
            showPassword: false
        }
    }

    submitHandler = e => {
        e.preventDefault()
        var data = {
            mailOrMobile: this.state.mailOrMobile,
            password: this.state.password
        }
            UserService.loginService(data)
                .then(response => {
                    localStorage.setItem('Token', JSON.stringify(response.data.token))
                    // localStorage.setItem('response', JSON.stringify(response.data))
                    if (response.status === 200) {
                        this.props.history.push("/dashboard/note")
                    }
                }).catch(err => {
                    this.props.history.push("/login")
                })
        }

    passwordHandler = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
        if(!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)){
            this.setState({
                isValidPassword : true,
            })
         }
         else{
            this.setState({
                isValidPassword : false,
            })
        }
    }

    changeHandler = e => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        this.setState({
            [e.target.name] : e.target.value
        })
        if(!pattern.test(this.state.mailOrMobile) && !this.state.mailOrMobile.match(/^[0-9]{11}$/)){
            this.setState({
                isMailOrMobile : true,
            })
        }
        else{
            this.setState({
                isMailOrMobile : false,
            })
        }
    }

    handleClickShowPassword = () => {
        let showPassword = !this.state.showPassword
        this.setState({ showPassword })
    }

    render() {
        const { mailOrMobile, password,showPassword } = this.state

        return (
            <div>
                <Card className='login' variant="outlined">
                    <div className='hdr'>
                        <h2>
                            <span style={{ color: '#1a73e8' }}>F</span>
                            <span style={{ color: '#df1a1a' }}>u</span>
                            <span style={{ color: '#ffc107' }}>n</span>
                            <span style={{ color: '#1a73e8' }}>d</span>
                            <span style={{ color: '#0fb12a' }}>o</span>
                            <span> </span>
                            <span style={{ color: '#df1a1a' }}>K</span>
                            <span style={{ color: '#e2b111' }}>e</span>
                            <span style={{ color: '#0fb12a' }}>e</span>
                            <span style={{ color: '#1a73e8' }}>p</span>
                        </h2>
                        <h4>Sign in</h4>
                    </div>
                    <form onSubmit={this.submitHandler}>

                        <TextField
                         autoComplete="off"
                            className="margin"
                            name="mailOrMobile"
                           error={this.state.isMailOrMobile}
                            value={mailOrMobile}
                            onChange={this.changeHandler}
                            label="Email or Mobile"
                            variant="outlined"
                            size="small"
                            helperText={this.state.isMailOrMobile ? "Enter valid mail or mobile" : null}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorMsg"></div>

                        {/* <FormControl className="margin" variant="outlined" size="small" style={{maxWidth:'254.67px'}} >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput */}
                        <TextField
                            style={{ maxWidth: '255.5px' }}
                            error= {this.state.isValidPassword}
                            helperText= {this.state.isValidPassword ? "Enter the valid password!!!" : null}
                            size="small"
                            variant="outlined"
                            className="margin"
                            id="outlined-adornment-password"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={this.passwordHandler}
                            // endAdornment={
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            edge="end">
                                            {showPassword ? <Visibility style={{color:"black"}}/> : <VisibilityOff style={{color:"black"}}/>}
                                        </IconButton>
                                    </InputAdornment>)
                            } }
                        />
                        {/* </FormControl> */}
                        <div className="errorMsg"></div>
                        {/* <button type='submit'>Login</button> */}
                        <Button className='btnn2' href="/forgotPassword">Forgot password?</Button><br />
                        <div className='btnn1'>
                        <Button className='btnn2' href="/register" >Sigin Up</Button>
                        <Button  type='submit' color="primary" variant='contained'>Signin</Button>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}
export default LoginPage
