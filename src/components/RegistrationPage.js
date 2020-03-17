import React, { Component } from 'react'
import RegistrationService from '../service/RegistrationService'
import '../css/register.scss'
import axios from 'axios'
import Constants from '../constants/Constants'
import LoginPage from './LoginPage'
import { Link } from 'react-router-dom'

class RegistrationPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fields: {},
            errors: {}
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

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
            axios.post(Constants.registerApi, this.state.fields)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
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
        return (
            <div>
                <form method="post" onSubmit={this.submitHandler}>
                    <div className='root'>
                        <input type='text' name="firstName" value={fields.firstName} onChange={this.changeHandler} placeholder='First Name' />
                        <div className="errorMsg">{errors.firstName}</div>
                        <input type='text' name="lastName" value={fields.lastName} onChange={this.changeHandler} placeholder='Last Name' />
                        <div className="errorMsg">{errors.lastName}</div>
                        <input type='text' name="emailAddress" value={fields.emailAddress} onChange={this.changeHandler} placeholder="Email" />
                        <div className="errorMsg">{errors.emailAddress}</div>
                        <input type='text' name="mobile" value={fields.mobile} onChange={this.changeHandler} placeholder='Mobile No.' />
                        <div className="errorMsg">{errors.mobile}</div>
                        <input type='password' name="password" value={fields.password} onChange={this.changeHandler} placeholder='Password' />
                        <div className="errorMsg">{errors.password}</div>
                        <button type='submit' >Submit</button>
                        <Link to="/login" >Login</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegistrationPage


// import React from 'react';



// class RegistrationPage extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         fields: {},
//         errors: {}
//       }

//       this.handleChange = this.handleChange.bind(this);
//       this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

//     };

//     handleChange(e) {
//       let fields = this.state.fields;
//       fields[e.target.name] = e.target.value;
//       this.setState({
//         fields
//       });

//     }

//     submituserRegistrationForm(e) {
//       e.preventDefault();
//       if (this.validateForm()) {
//           let fields = {};
//           fields["username"] = "";
//           fields["emailid"] = "";
//           fields["mobileno"] = "";
//           fields["password"] = "";
//           this.setState({fields:fields});
//           console.log('hello',this.state.fields)
//           alert("Form submitted");
//       }

//     }

//     validateForm() {

//       let fields = this.state.fields;
//       let errors = {};
//       let formIsValid = true;

//       if (!fields["username"]) {
//         formIsValid = false;
//         errors["username"] = "*Please enter your username.";
//       }

//       if (typeof fields["username"] !== "undefined") {
//         if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
//           formIsValid = false;
//           errors["username"] = "*Please enter alphabet characters only.";
//         }
//       }

//       if (!fields["emailid"]) {
//         formIsValid = false;
//         errors["emailid"] = "*Please enter your email-ID.";
//       }

//       if (typeof fields["emailid"] !== "undefined") {
//         //regular expression for email validation
//         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//         if (!pattern.test(fields["emailid"])) {
//           formIsValid = false;
//           errors["emailid"] = "*Please enter valid email-ID.";
//         }
//       }

//       if (!fields["mobileno"]) {
//         formIsValid = false;
//         errors["mobileno"] = "*Please enter your mobile no.";
//       }

//       if (typeof fields["mobileno"] !== "undefined") {
//         if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
//           formIsValid = false;
//           errors["mobileno"] = "*Please enter valid mobile no.";
//         }
//       }

//       if (!fields["password"]) {
//         formIsValid = false;
//         errors["password"] = "*Please enter your password.";
//       }

//       if (typeof fields["password"] !== "undefined") {
//         if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
//           formIsValid = false;
//           errors["password"] = "*Please enter secure and strong password.";
//         }
//       }

//       this.setState({
//         errors: errors
//       });
//       return formIsValid;


//     }

//   render() {
//     return (
//     <div id="main-registration-container">
//      <div id="register">
//         <h3>Registration page</h3>
//         <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
//         <label>Name</label>
//         <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
//         <div className="errorMsg">{this.state.errors.username}</div>
//         <label>Email ID:</label>
//         <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
//         <div className="errorMsg">{this.state.errors.emailid}</div>
//         <label>Mobile No:</label>
//         <input type="text" name="mobileno" value={this.state.fields.mobileno} onChange={this.handleChange}   />
//         <div className="errorMsg">{this.state.errors.mobileno}</div>
//         <label>Password</label>
//         <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
//         <div className="errorMsg">{this.state.errors.password}</div>
//         <input type="submit" className="button"  value="Register"/>
//         </form>
//     </div>
// </div>

//       );
//   }


// }


// export default RegistrationPage;