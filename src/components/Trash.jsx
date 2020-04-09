import React, { Component } from 'react'
import NoteService from '../service/NoteService'
import Nav from './Nav';
import '../css/trash.scss'
import { Card, CardContent, Chip, CardActionArea, IconButton, Tooltip, Snackbar, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import CloseIcon from '@material-ui/icons/Close';

class Trash extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            open: false
        }
    }

    componentDidMount() {
        this.getTrashNotes();
    }

    getTrashNotes = () => {
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

    restoreNoteFromTrash = (noteId) => {

        NoteService.restoreNoteFromTrashService(noteId, true)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        this.getTrashNotes();
        window.location.reload(false);
        this.handleClose();

    }

    handleClose = () => {
        this.setState(prevState => {
            return { open: !prevState.open }
        })
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
                        <div>
                            <Card className='trashNote' variant="outlined" style={{ backgroundColor: note.color, borderRadius: "12px", marginTop: "12px" }}>
                                <div className='firstDiv'>
                                    <div className="title" onClick={this.updateNote}>
                                        <h3>{note.title}</h3>
                                    </div>
                                </div>
                                <div className='secondDiv' onClick={this.updateNote}>
                                    <p>{note.description}</p>
                                </div>
                                {note.labels.length ?
                                    <CardContent>
                                        {
                                            note.labels.map(label =>
                                                <Chip variant="outlined"
                                                    size="small"
                                                    key={label.labelId}
                                                    label={label.labelName}
                                                />
                                            )
                                        }
                                    </CardContent> : null
                                }
                                <CardActionArea>
                                    <Tooltip title="Delete Forever">
                                        <IconButton>
                                            <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Restore">
                                        <IconButton onClick={() => this.restoreNoteFromTrash(note.noteId)}>
                                            <RestoreFromTrashIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </CardActionArea>
                            </Card>
                        </div>
                    )}
                </div>
                <Snackbar
                    // key={messageInfo ? messageInfo.key : undefined}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message="Note Restored"
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={this.handleClose}>
                                UNDO
                                        </Button>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        )
    }
}

export default Trash
