import React, { Component } from 'react'
import '../css/createNote.scss'
import { Card, InputBase, Button, Divider } from '@material-ui/core'
import NoteService from '../service/NoteService'

 class CreateNote extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            takeNote: false,
            title: '',
            description: ''
        }
    }

    handlerChange = e => {
        this.setState({ [e.target.name]: e.target.value,})
    }

    expandTakeNote = () => {
        if(this.state.title !== '' || this.state.description !== ''){
            var note = {
                title: this.state.title,
                description: this.state.description
            }
            NoteService.createNoteService(note)
            .then(response => {
                console.log(response)
            })
        } 
        this.setState ({takeNote: !this.state.takeNote})
    }

    render() {
        return (
            <div>
                <div className='contnr'>
                    <Card variant="outlined">
                        {
                            !this.state.takeNote ?
                            <div className='inpDiv'>
                                <div className='inp'>
                                <InputBase
                                    placeholder="Take a note..."
                                    inputProps={{"aria-label":"naked"}}
                                    onClick={this.expandTakeNote}/>
                             </div>
                            </div> : null
                        }
                        {
                            this.state.takeNote ?
                            <div className='inpDiv1'>
                                <div className='inp1'>
                                <InputBase
                                    placeholder="Title"
                                    onChange={this.handlerChange}
                                    name="title"
                                    multiline
                                    inputProps={{"aria-label":"naked"}}/><br/>
                                <InputBase
                                    placeholder="Take a note..."
                                    onChange={this.handlerChange}
                                    name="description"
                                    multiline
                                    inputProps={{"aria-label":"naked"}}/>
                                </div>
                                <Divider/>
                                    <Button onClick={this.expandTakeNote}>close</Button>
                            </div> : null}
                    </Card>
                </div>
            </div>
        )
    }
}

export default CreateNote
