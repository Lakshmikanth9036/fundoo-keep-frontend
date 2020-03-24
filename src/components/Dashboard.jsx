import React, { Component } from 'react'
import CreateNote from './CreateNote';
import DisplayAllNotes from './DisplayAllNotes';
import Nav from './Nav';

class Note extends Component {

    render() {
        return (
            <div style={{height: '100%'}}>
                    <div>
                        <Nav/>
                    </div>
                <div>
                    <CreateNote/>
                </div>

                <div>
                    <DisplayAllNotes/>
                </div>
            </div>
        )
    }
}

export default Note
