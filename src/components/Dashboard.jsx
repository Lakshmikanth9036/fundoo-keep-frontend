import React, { Component } from 'react'
import CreateNote from './CreateNote';
import DisplayAllNotes from './DisplayAllNotes';
import Nav from './Nav';
import NoteService from '../service/NoteService';

class Note extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             notes:[]
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

    render() {

        const { notes } = this.state

        return (
            <div style={{height: '100%'}}>
                    <div>
                        <Nav/>
                    </div>
                <div>
                    <CreateNote/>
                </div>

                <div className='container'>
                    {notes.map(note => 
                    <DisplayAllNotes note={note}/>
                    )}
                </div>
            </div>
        )
    }
}

export default Note
