import React, { Component } from 'react'

class Demo extends Component {
    render() {
        return (
            <div>
                <h1>{localStorage.getItem('response')}</h1> 
            </div>
        )
    }
}

export default Demo
