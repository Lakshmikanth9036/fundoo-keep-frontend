import React, { Component } from 'react'
import DisplayAllNotes from './DisplayAllNotes'
import Nav from './Nav'
import LabelService from '../service/LabelService'
import CreateNote from './CreateNote'

class LabledNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        LabelService.getNotesOfLableService(this.props.location.state)
            .then(response => {
                this.setState({
                    notes: response.data.obj
                })
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    }


    render() {

        const { notes } = this.state

        return (
            <div>
                <div>
                    <Nav />
                </div>
                <div>
                    <CreateNote/>
                </div>
                <div className='container' style={{ marginTop: "20px" }}>
                    {notes.map(note =>
                        <DisplayAllNotes key={note.noteId} note={note} />
                    )}
                </div>
            </div>
        )
    }
}

export default LabledNotes
