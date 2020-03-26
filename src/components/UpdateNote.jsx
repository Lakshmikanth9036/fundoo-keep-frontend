import React, { Component } from 'react'
import { Dialog, InputBase, DialogContent, DialogActions, Button } from '@material-ui/core'
import Icon from './icon'

export class UpdateNote extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             title: '',
             description:'',
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
            description: this.props.note.description
        })    
    }
    
    updateNote = () => {
        var data = {
            title: this.state.title,
            description: this.state.description
        }
        this.handleClose()
    }

    render() {

        const { title,description } = this.state

        return (
            <div>
                <Dialog open={this.state.openDialog} onClose={this.handleClose}>
                    <DialogContent style={{backgroundColor:this.props.note.color}}>
                        <div>
                            <InputBase
                                placeholder="Title"
                                multiline
                                inputProps={{'aria-label': 'naked'}}
                                name="title"
                                value={title}
                                onChange={this.handleChange}
                            />
                            </div>
                            <div>
                            <InputBase
                                placeholder="Take a note..."
                                multiline
                                inputProps={{'aria-label': 'naked'}}
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions style={{backgroundColor:this.props.note.color}}>
                        <div>
                            <Icon  nts = {this.props.note}/>
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
