import React, { Component } from 'react';
import UserService from '../service/UserService';
import { TextField, InputAdornment, Card } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import '../css/register.scss'
class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            emailAddress: ''
        }
    }

    submitHandler = e => {
        e.preventDefault()
        this.setState({emailAddress: this.state.emailAddress})

        console.log(this.state.emailAddress)
                UserService.forgotPassService(this.state.emailAddress)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
         })
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    } 

    render() {
        return (
            <div>
                <Card className='forgot' variant="outlined">
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
                        <h3>Account Recovery</h3>
                    </div>
                <form method="post"  onSubmit={this.submitHandler}>
                    <TextField
                        className='mrgn'
                        name="emailAddress"
                        value={this.state.emailAddress}
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
                    /><br />
                    <Button className='bt2' href="/login" >Back</Button>
                    <Button className='bt1' type='submit' variant="contained" color="primary">Next</Button>
                </form>
                </Card>
            </div>
        )
    }
}

export default ForgotPassword
