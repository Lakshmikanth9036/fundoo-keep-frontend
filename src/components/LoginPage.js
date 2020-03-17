import React, { Component } from 'react'
import axios from 'axios'
import Constants from '../constants/Constants'
import '../css/login.scss'
import {Link} from 'react-router-dom'

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: '',
            mobile: '',
            password: ''
        }
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.put(Constants.loginApi,this.state)
        .then(response => {
            localStorage.setItem('response', response.data)
            console.log(response)
        }).catch(error => {
            console.log('err')
        })}
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { emailAddress, mobile, password } = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div className='login'>
                        <input type='text' name="emailAddress" value={emailAddress} onChange={this.changeHandler} placeholder="Email" />
                        <h3>----------------Or---------------</h3>
                        <input type='text' name="mobile" value={mobile} onChange={this.changeHandler} placeholder='Mobile No.' />
                        <input type='password' name="password" value={password} onChange={this.changeHandler} placeholder='Password' />
                        <button type='submit'>Login</button>
                        <Link to="/" >Registration</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage
