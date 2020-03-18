import React, { Component } from 'react'
import {useParams} from 'react-router-dom'

export class ResetPassword extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             param: useParams()
        }
    }
    
    render() {
        return (
            <div>
                <h3>hello{this.state.params}</h3>
            </div>
        )
    }
}

export default ResetPassword
