import React, { Component } from 'react'
import NoteService from '../service/NoteService';
import { Container, Card, CardHeader, CardContent, Typography, CardActionArea, IconButton, Chip, InputBase, Divider, Button } from '@material-ui/core';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreIcon from '@material-ui/icons/MoreVert';
import '../css/displayAllNote.scss'


class DisplayAllNotes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            editNote: false
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
                            !this.state.editNote ?
                            <Card className='cards' variant="outlined" >
                                <div className='notes'>
                                <h3>{note.title}</h3>
                                <p>{note.description}</p>
                                </div>
                                <CardContent>
                                    {
                                        note.labels.map(label =>
                                            <Chip size="small" label={label.labelName} onDelete={() => this.deleteLabel(note.noteId,label.labelId)} />
                                        )
                                    }
                                </CardContent>
                                <CardActionArea style={{width:"100%"}} disableSpacing>
                                    <div className="icon">
                                    <IconButton>
                                        <ColorLensIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton>
                                        <ArchiveIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton>
                                        <CropOriginalIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton>
                                        <PersonAddIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton 
                                        aria-label="show more"
                                        aria-haspopup="true"
                                        onClick={this.handleMobileMenuOpen}
                                        fontSize="small">
                                        <MoreIcon />
                                    </IconButton>
                                    </div>
                                </CardActionArea>
                            </Card>: null
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
