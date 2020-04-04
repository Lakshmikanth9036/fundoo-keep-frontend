import React, { Component } from 'react'
import NoteService from '../service/NoteService'
import Nav from './Nav';
import '../css/trash.scss'
import { Card, CardContent, Chip, CardActionArea, IconButton, Tooltip } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

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

    restoreNoteFromTrash = (noteId) => {
        
        NoteService.restoreNoteFromTrashService(noteId, true)
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
                <div>
                    <Nav />
                </div>
                <div className="trash">Notes in Trash are deleted after 7 days.</div>
                <div>
                    {notes.map(note =>
                        <div className='trashCont'>
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
                                </CardContent>: null
                                }
                              <CardActionArea>
                              <div>
                                  <Tooltip title="Delete Forever">
                                    <IconButton>
                                        <DeleteForeverIcon fontSize="small"/>
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Restore">
                                    <IconButton onClick={() => this.restoreNoteFromTrash(note.noteId)}>
                                        <RestoreFromTrashIcon fontSize="small"/>
                                    </IconButton>
                                    </Tooltip>
                                </div>
                              </CardActionArea>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Trash
