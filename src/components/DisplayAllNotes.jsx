import React, { Component } from 'react'
import NoteService from '../service/NoteService';
import { Container, Card,CardContent, Chip } from '@material-ui/core';

import '../css/displayAllNote.scss'
import Icon from './icon';


class DisplayAllNotes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            editNote: false,
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

    hideNote = () => {
        this.setState({editNote: !this.state.editNote})
    }

    deleteLabel = (note,label) => {
        NoteService.removeLabelFromNoteService(label,note)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {

        const { notes } = this.state

        return (
            <div>
                <Container className='container' component="main" maxWidth="lg">
                    {
                        notes.map(note =>
                            
                            <Card className='cards' variant="outlined" key={note.noteId}>
                                <div className='notes'>
                                <h3>{note.title}</h3>
                                <p>{note.description}</p>
                                </div>
                                <CardContent>
                                    {
                                        note.labels.map(label =>
                                            <Chip size="small" key={label.labelId} label={label.labelName} onDelete={() => this.deleteLabel(note.noteId,label.labelId)} />
                                        )
                                    }
                                </CardContent>
                              <div>
                                <Icon  nts = {note}/>
                              </div>
                            </Card>
                            // <Card className='cards2' variant="outlined" >
                            //     <InputBase
                            //         value={note.title}
                            //         onChange={this.handlerChange}
                            //         name="title"
                            //         multiline
                            //         inputProps={{"aria-label":"naked"}}/><br/>
                            //     <InputBase
                            //         value={note.description}
                            //         onChange={this.handlerChange}
                            //         name="description"
                            //         multiline
                            //         inputProps={{"aria-label":"naked"}}/>
                            //     <Divider/>
                            //         <Button onClick={this.expandTakeNote}>close</Button>
                            // </Card>
                        )
                    }
                </Container>
            </div>
        )
    }
}

export default DisplayAllNotes
