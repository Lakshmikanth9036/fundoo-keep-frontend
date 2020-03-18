import React, { Component } from 'react';
import '../css/register.scss'
import { TextField, InputAdornment, Card } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Constants from '../constants/Constants';
import axios from 'axios'


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
//        http://localhost:8080/user/forgotpassword?emailAddress=kanth1997.9036%40gmail.com
        axios.post(Constants.forgetPasswordApi+this.state.emailAddress)
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

    render() {
        return (
            <div>
                <Card className='root' variant="outlined">
                <form method="post"  onSubmit={this.submitHandler}>
                    <TextField
                      className='margin'
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
                    />
                    <Button className='btn' type='submit' variant="contained" color="primary">Signup</Button><br />
                </form>
                </Card>
            </div>
        )
    }
}

export default ForgotPassword
