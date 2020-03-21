import React, { Component } from 'react'
import NoteService from '../service/NoteService';
import { Container, Card, CardHeader, CardContent, Typography, CardActionArea, IconButton, Chip } from '@material-ui/core';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreIcon from '@material-ui/icons/MoreVert';

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

    render() {

        const { notes } = this.state

        return (
            <div>
                <Container className='container' component="main" maxWidth="lg">
                    {
                        notes.map(note =>
                            !this.state.editNote ?
                            <Card className='cards' variant="outlined" >
                                <div onClick={this.edit}>
                                <CardHeader title={note.title} onClick={this.hideNote}/>
                                <CardContent onClick={this.hideNote}>
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        {note.description}
                                    </Typography>
                                </CardContent>
                                </div>
                                <CardContent>
                                    {
                                        note.labels.map(label =>
                                            <Chip label={label.labelName} onDelete={() => { }} />
                                        )
                                    }
                                </CardContent>
                                <CardActionArea style={{width:"100%"}} disableSpacing>
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
                                </CardActionArea>
                            </Card> : null 
                        )
                    }
                </Container>
            </div>
        )
    }
}

export default DisplayAllNotes
