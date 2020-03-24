import React, { Component } from 'react'
import NoteService from '../service/NoteService';
import { Container, Card, CardHeader, CardContent, Typography, CardActionArea, IconButton, Chip, InputBase, Divider, Button, Popper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
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
            editNote: false,
            open: false
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

    handleToggle = () => {
        this.setState(
            prevState => ({ open: !prevState.open})
    )}

    handleClose = event => {
        if(this.anchorEl.contains(event.target)){
            return;
        }
        this.setState({open: false})
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
        const { open } = this.state

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
                                        buttonRef = {node => {this.anchorEl = node}}
                                        aria-label="show more"
                                        aria-haspopup="true"
                                        onClick={this.handleToggle}
                                        fontSize="small">
                                            {console.log(this.anchorEl)}
                                            {console.log(open)}
                                        <MoreIcon />
                                    </IconButton>
                                    <Popper 
                                        open={open}
                                        anchorEl={this.anchorEl}>
                                            <Card>
                                                <ClickAwayListener onClick={this.handleClose}>
                                                    <MenuList>
                                                        <MenuItem onClick={this.trashNote}>Delete Note</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Card>
                                    </Popper>
                                    </div>
                                </CardActionArea>
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
