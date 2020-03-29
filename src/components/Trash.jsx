import React, { Component } from 'react'
import DisplayAllNotes from './DisplayAllNotes'
import NoteService from '../service/NoteService'
import Nav from './Nav';
import '../css/trash.scss'

class Trash extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        NoteService.getTrashNoteService()
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
        <div className="trash">Notes in Trash are deleted after 7 days.</div>
                <div className='trashCont'>
                    {notes.map(note =>
                        <DisplayAllNotes key={note.noteId} note={note} />
                    )}
                </div>
            </div>
        )
    }
}

export default Trash
