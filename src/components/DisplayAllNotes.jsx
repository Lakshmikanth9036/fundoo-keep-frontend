import React, { Component } from 'react'
import NoteService from '../service/NoteService';
import { Container, Card, CardContent, Chip } from '@material-ui/core';

import '../css/displayAllNote.scss'
import Icon from './icon';
import UpdateNote from './UpdateNote';


class DisplayAllNotes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            editNote: false,
            noteId: '',
            title: '',
            description: '',
            color: ''
        }
    }

    componentDidMount() {
        NoteService.getAllNoteService()
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

    updateNote = () => {
        // this.setState({
        //     noteId: this.note
        // })
        this.setState(prevState => ({ editNote: !prevState.editNote }))
    }

    deleteLabel = (note, label) => {
        NoteService.removeLabelFromNoteService(label, note)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        const { note } = this.props
        return (
            <div>
                <Card className='cards' variant="outlined" key={note.noteId} style={{ backgroundColor: note.color }}>
                    <div className='notes' onClick={this.updateNote}>
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                    </div>
                    <CardContent>
                        {
                            note.labels.map(label =>
                                <Chip variant="outlined" size="small" key={label.labelId} label={label.labelName} onDelete={() => this.deleteLabel(note.noteId, label.labelId)} />
                            )
                        }
                    </CardContent>
                    <div>
                        <Icon nts={note} />
                    </div>
                    <div>
                        {this.state.editNote ? <UpdateNote note={note} /> : null}
                    </div>
                </Card>
            </div>
        )
    }
}

export default DisplayAllNotes
