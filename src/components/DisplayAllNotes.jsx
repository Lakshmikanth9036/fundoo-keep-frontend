import React, { Component } from 'react'
import NoteService from '../service/NoteService';
import { Card, CardContent, Chip, IconButton } from '@material-ui/core';
import pin from '../images/pin.png';
import unpin from '../images/unpin.png';
import '../css/displayAllNote.scss';
import Icon from './icon';
import UpdateNote from './UpdateNote';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';

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

    updateNote = () => {
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
            this.callback();
    }

    pinNote = (noteId) => {
        NoteService.pinNoteService(noteId)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })  
       this.callback();
    }

    removeReminder = (noteId) => {
        NoteService.removeReminderService(noteId)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
       this.callback();
    }

    callback = () => {
        this.props.parentCallback();
       // window.location.reload(false);
    }

    render() {
        var moment= require('moment');
        const { note } = this.props
        return (
            <div key={note.noteId}>
                <Card className='cards' variant="outlined" style={{ backgroundColor: note.color, borderRadius:"12px" }}>
                    <div className='firstDiv'>

                        <div className="title" onClick={this.updateNote}>
                            <h3>{note.title}</h3>
                        </div>
                        <div className="pinbtn">
                            <IconButton onClick={() => this.pinNote(note.noteId)}>
                                {
                                    note.pin ?
                                        <img src={pin} alt="Pin" /> :
                                        <img src={unpin} alt="Unpin" />
                                }
                            </IconButton>
                        </div>
                        </div>
                        <div className='secondDiv'  onClick={this.updateNote}>
                            <p>{note.description}</p>
                        </div>
                        <CardContent>
                            {
                                note.labels.map(label =>
                                    <Chip variant="outlined" 
                                          size="small" 
                                          key={label.labelId} 
                                          label={label.labelName} 
                                          onDelete={() => this.deleteLabel(note.noteId, label.labelId)} />
                                )
                            }

                            {
                                note.reminder !== null ? <Chip  icon={<AccessTimeOutlinedIcon/>} 
                                                                variant="outlined" size="small" 
                                                                label={moment(note.reminder).format('DD MMM, HH:mm')} 
                                                                onDelete={() => this.removeReminder(note.noteId)}/> : null
                            }
                        </CardContent>
                        <div>
                            <Icon isArchive={this.props.isArchive} parentCallback={this.callback} nts={note} />
                        </div>
                        <div >
                            {this.state.editNote ? <UpdateNote note={note} /> : null}
                        </div>
                </Card>
            </div>
        )
    }
}

export default DisplayAllNotes
