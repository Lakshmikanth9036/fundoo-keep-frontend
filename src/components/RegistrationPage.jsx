import React, { Component } from 'react'
import '../css/register.scss'
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
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
            isfirstName: false,
            islastName:false,
            isMail:false,
            isMobile:false,
            isValidPassword: false,
            showPassword: false
        }
    }

    firstNameHandler = (e) => {
        e.preventDefault()
        let fields = this.state.fields
        let errors = this.state.errors
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        })
        if(!fields[e.target.name].match(/^[a-zA-Z ]*$/)){
            errors[e.target.name] = "*Please enter alphabet characters only."
            this.setState({
                errors,
                isfirstName: true
            })
        }
        else{
            this.setState({
                isfirstName: false
            })
        }
    }

    lastNameHandler = (e) => {
        e.preventDefault()
        let fields = this.state.fields
        let errors = this.state.errors
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        })
        if(!fields[e.target.name].match(/^[a-zA-Z ]*$/)){
            errors[e.target.name] = "*Please enter alphabet characters only."
            this.setState({
                errors,
                islastName: true
            })
        }
        else{
            this.setState({
                islastName: false
            })
        }
    }

    mailHandler = (e) => {
        e.preventDefault()
        let fields = this.state.fields
        let errors = this.state.errors
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        })
        if (!pattern.test(fields[e.target.name])) {
            errors[e.target.name] = "*Please enter valid email-ID."
            this.setState({
                errors,
                isMail: true
            })
        }
        else{
            this.setState({
                isMail: false
            })
        }
    }

    mobileHandler = (e) => {
        e.preventDefault()
        let fields = this.state.fields
        let errors = this.state.errors
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        })
        if (!fields[e.target.name].match(/^[0-9]{10}$/)) {
            errors[e.target.name] = "*Please enter valid mobile no."
            this.setState({
                errors,
                isMobile: true
            })
        }
        else{
            this.setState({
                isMobile: false
            })
        }
    } 

    passwordHandler = e => {
        e.preventDefault()
        let fields = this.state.fields
        let errors = this.state.errors
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        })
        if(!fields[e.target.name].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)){
            errors[e.target.name] = "*Please enter secure and strong password."
            this.setState({
                errors,
                isValidPassword: true
            })
        }
         else{
            this.setState({
                isValidPassword : false
            })
        }
    }

    changeHandler = (e) => {
        let fields = this.state.fields
        // let errors = this.state.errors
        fields[e.target.name] = e.target.value
        this.setState({
            fields
        })
    }


    submitHandler(e) {
        e.preventDefault();
        console.log(this.state.fields)
        // if (this.isValidForm()) {
        //     UserService.registrationService(this.state.fields)
        //         .then(response => {
        //             if(response.status === 200){
        //                 this.props.history.push("/login")
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // }
    }

    handleClickShowPassword = () => {
        let showPassword = !this.state.showPassword
        this.setState({ showPassword })
    }

    isValidForm = () => {
        console.log("first")
        let fields = this.state.fields
        let errors = {}
        let formIsValid = true

        if (!fields["firstName"]) {
            formIsValid = false
            console.log("first")
            this.setState({isfirstName:true})
            errors["firstName"] = "*Please enter your first name"
        }

        if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                this.setState({isfirstName:true})
                errors["firstName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["lastName"]) {
            formIsValid = false
            this.setState({islastName:true})
            errors["lastName"] = "*Please enter your last name"
        }

        if (typeof fields["lastName"] !== "undefined") {
            if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                this.setState({islastName:true})
                errors["lastName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["emailAddress"]) {
            formIsValid = false;
            this.setState({isMail:true})
            errors["emailAddress"] = "*Please enter your email-ID.";
        }

        if (typeof fields["emailAddress"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailAddress"])) {
                this.setState({isMail:true})
                formIsValid = false;
                errors["emailAddress"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["mobile"]) {
            formIsValid = false;
            this.setState({isMail:true})
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
                        <h4>Sign Up</h4>
                    </div>
                    <form method="post" onSubmit={this.submitHandler}>
                        {/* <input type='text' name="firstName" value={fields.firstName} onChange={this.changeHandler} placeholder='First Name' /> */}
                        <TextField
                            name="firstName"
                            value={fields.firstName}
                            error={this.state.isfirstName}
                            helperText={this.state.isfirstName ? errors.firstName : null}
                            onChange={this.firstNameHandler}
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
                        <div className="errorMsg"></div>
                        {/* <input type='text' name="lastName" value={fields.lastName} onChange={this.changeHandler} placeholder='Last Name' /> */}
                        <TextField
                            name="lastName"
                            value={fields.lastName}
                            error={this.state.islastName}
                            helperText={this.state.islastName ? errors.lastName : null}
                            onChange={this.lastNameHandler}
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
                        <div className="errorMsg"></div>
                        {/* <input type='text' name="emailAddress" value={fields.emailAddress} onChange={this.changeHandler} placeholder="Email" /> */}
                        <TextField
                            name="emailAddress"
                            value={fields.emailAddress}
                            error={this.state.isMail}
                            helperText={this.state.isMail ? errors.emailAddress : null}
                            onChange={this.mailHandler}
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
                        <div className="errorMsg"></div>
                        {/* <input type='text' name="mobile" value={fields.mobile} onChange={this.changeHandler} placeholder='Mobile No.' /> */}
                        <TextField
                            name="mobile"
                            value={fields.mobile}
                            error={this.state.isMobile}
                            helperText={this.state.isMobile ? errors.mobile : null}
                            onChange={this.mobileHandler}
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
                        <div className="errorMsg"></div>
                        {/* <input type='password' name="password" value={fields.password} onChange={this.changeHandler} placeholder='Password' /> */}
                        <TextField
                        style={{ maxWidth: '255.5px' }}
                        error= {this.state.isValidPassword}
                        helperText= {this.state.message}
                        size="small"
                        variant="outlined"
                        className="margin"
                        label="Password"
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={fields.password}
                                error={this.state.isValidPassword}
                                helperText={this.state.isValidPassword ? errors.password : null}
                                onChange={this.passwordHandler}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                            color="black"
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                edge="end">
                                                {showPassword ? <Visibility style={{color:"black"}}/> : <VisibilityOff style={{color:"black"}}/>}
                                            </IconButton>
                                        </InputAdornment>)}}
                            />
                        <div className="errorMsg"></div>
                        {/* <button type='submit' >Submit</button> */}
                        <Button className='btn2' href="/login" >Sign in</Button>
                        <Button className='btn1' type='submit' color="primary" variant='contained'>Signup</Button>
                    </form>
                </Card>
            </div>
        )
    }
}

export default RegistrationPage


