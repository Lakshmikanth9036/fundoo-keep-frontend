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
            fields: {},
            errors: {},
            valid: {
                firstName: false,
                lastName: false,
                emailAddress: false,
                mobile: false,
                password: false
            },
            showPassword: false,
            isValid: false
        }
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state.fields)
        UserService.loginService(this.state.fields)
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

    changeHandler = (e) => {
        let fields = { ...this.state.fields }
        fields[e.target.name] = e.target.value
        let isValid = this.isValidForm(fields);
        this.setState({
            fields: fields,
            isValid: isValid
        })
    }

    handleClickShowPassword = () => {
        let showPassword = !this.state.showPassword
        this.setState({ showPassword })
    }

    isValidForm = (fields) => {

        let valid = { ...this.state.valid };
        let errors = { ...this.state.errors };
        let formIsValid = true;

        if (!fields["mailOrMobile"]) {
            formIsValid = false;
        }

        if (typeof fields["mailOrMobile"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["mailOrMobile"]) && !fields["mailOrMobile"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                valid["mailOrMobile"] = true;
                errors["mailOrMobile"] = "*Please enter vaild Email or Mobile No.";
            }
            else {
                valid["mailOrMobile"] = false;
            }
        }

        if (!fields["password"]) {
            formIsValid = false
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                valid["password"] = true
                errors["password"] = "*Please enter secure and strong password.";
            }
            else {
                valid["password"] = false
            }
        }

        this.setState({
            errors: errors,
            valid: valid
        })
        return formIsValid
    }

    render() {
        const { fields, errors, valid } = this.state
        const { showPassword } = this.state

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
                            value={fields.mailOrMobile}
                            error={valid.mailOrMobile}
                            helperText={valid.mailOrMobile ? errors.mailOrMobile : null}
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
                        <div className="errorMsg"></div>

                        {/* <FormControl className="margin" variant="outlined" size="small" style={{maxWidth:'254.67px'}} >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput */}
                        <TextField
                            style={{ maxWidth: '255.5px' }}
                            value={fields.password}
                            error={valid.password}
                            helperText={valid.password ? errors.password : null}
                            size="small"
                            variant="outlined"
                            className="margin"
                            id="outlined-adornment-password"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={this.changeHandler}
                            // endAdornment={
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            edge="end">
                                            {showPassword ? <Visibility style={{ color: "black" }} /> : <VisibilityOff style={{ color: "black" }} />}
                                        </IconButton>
                                    </InputAdornment>)
                            }}
                        />
                        {/* </FormControl> */}
                        <div className="errorMsg"></div>
                        {/* <button type='submit'>Login</button> */}
                        <Button className='btnn2' href="/forgotPassword">Forgot password?</Button><br />
                        <div className='btnn1'>
                            <Button className='btnn2' href="/register" >Sigin Up</Button>
                            <Button disabled={!this.state.isValid} type='submit' color="primary" variant='contained'>Signin</Button>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}
export default LoginPage
