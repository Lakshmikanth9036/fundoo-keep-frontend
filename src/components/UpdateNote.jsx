import React, { Component } from 'react'
import { Dialog, InputBase, DialogContent, DialogActions, Button, Chip, Tooltip } from '@material-ui/core'
import Icon from './icon'
import NoteService from '../service/NoteService'
import '../css/updateNote.scss'
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';

export class UpdateNote extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            color: '',
            closeDialog: false,
            openDialog: true
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClose = () => {
        this.setState(prevState => ({
            closeDialog: !prevState.closeDialog,
            openDialog: !prevState.openDialog
        }))
    }

    componentDidMount() {
        this.setState({
            title: this.props.note.title,
            description: this.props.note.description,
            color: this.props.note.color
        })
    }

    updateNote = () => {
        var data = {
            title: this.state.title,
            description: this.state.description,
            color: this.state.color
        }
        console.log(data + this.props.note.noteId)
        NoteService.updateNoteService(data, this.props.note.noteId)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        this.handleClose()
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

        const { title, description } = this.state
        const { note } = this.props
        var moment= require('moment');

        return (
            <div>
                <Dialog open={this.state.openDialog} onClose={this.handleClose} fullWidth="true" >
                    <DialogContent style={{ backgroundColor: note.color }}>
                        <div>
                            <InputBase
                                style={{ width: "100%" }}
                                placeholder="Title"
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                                name="title"
                                value={title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <InputBase
                                style={{ width: "100%" }}
                                placeholder="Take a note..."
                                multiline
                                inputProps={{ 'aria-label': 'naked' }}
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                              <div>
                            {
                                note.labels.map(label =>
                                    <Chip variant="outlined"
                                        size="small"
                                        key={label.labelId}
                                        label={label.labelName}
                                        onDelete={() => this.deleteLabel(note.noteId, label.labelId)} />
                                )
                            }
                            </div>
                            <div style={{flex:"1"}}>
                            {
                                note.reminder !== null ? <Chip  icon={<AccessTimeOutlinedIcon/>} 
                                                                variant="outlined" size="small" 
                                                                label={moment(note.reminder).format('DD MMM, HH:mm')} 
                                                                onDelete={() => this.removeReminder(note.noteId)}/> : null
                            }
                            </div>
                            <Tooltip title={`Created ${moment(note.noteCreated).format('MMM DD')}`}>
                            <div style={{fontSize:"15px", color:"#3c4043"}}>
                                Edited {moment(note.noteUpdated).format('MMM DD')}
                            </div>
                            </Tooltip>
                        </div>
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: this.props.note.color }}>
                        <div className="updateIcons">
                            <Icon nts={this.props.note} />
                        </div>
                        <div>
                            <Button onClick={this.updateNote}>close</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default UpdateNote
