import React, { Component } from 'react';
import { Dialog, DialogContent, InputBase, DialogActions, Button, DialogTitle, IconButton, Divider } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import '../css/editLabel.scss';
import LabelService from '../service/LabelService';

export class EditLabel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            closeDialog: false,
            openDialog: true,
            labelName: '',
            editLabel:''
        }
        this.handleChange = this.handleChange.bind(this)
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

    deleteLabel = (lId) => {
        LabelService.deleteLabelService(lId)
        .then(response => {
            console.log(response)
        })
        .catch(
            error => {
                console.log(error)
            }
        )
    }

    createLabel = () => {
        var data = {
            labelName: this.state.labelName
        }
        LabelService.createLabelService(data)
        .then(response => {
            console.log(response)
        })
        .catch(
            error => {
                console.log(error)
            }
        )
    }

    render() {
        return (
            <div className="labelsCont">
                Edit Label
                <Dialog open={this.state.openDialog} >
                    <DialogTitle>Edit Label</DialogTitle>
                    <DialogContent>
                        <div className="createLabel">
                            <InputBase
                                style={{flex:1}}
                                placeholder="Create New Label"
                                multiline
                                name="labelName"
                                onChange={this.handleChange}
                            />
                            <IconButton onClick={this.createLabel}>
                                <CheckIcon fontSize="small"/>
                            </IconButton>
                        </div>

                        {
                            this.props.labels.map(label =>
                                <div className="labels" key={label.labelId}>
                                    <IconButton onClick={() => this.deleteLabel(label.labelId)}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                    <InputBase
                                        multiline
                                        inputProps={{ 'aria-label': 'naked' }}
                                        name="editLabel"
                                        value={label.labelName}
                                        onChange={this.handleChange}
                                    />
                                    <IconButton>
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                </div>
                            )
                        }

                    </DialogContent>
                    <Divider/>
                    <DialogActions>
                        <div>
                            <Button onClick={this.handleClose}>Done</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default EditLabel
