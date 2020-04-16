import React, { Component } from 'react'
import Nav from './Nav'
import DisplayAllNotes from './DisplayAllNotes'
import NoteService from '../service/NoteService'
import ViewContext from './ViewContext'

class Remainder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: []
        }
    }

    static contextType = ViewContext;

    componentDidMount() {
        NoteService.getRemainderNotesService()
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

        let classes = ''

        if(this.context.view){
            classes = 'listCont'
        }
        else{
            classes = 'container'
        }

        return (
            <div>
                <div>
                    <Nav />
                </div>
             <div style={this.context.view ? {marginTop: "120px", marginLeft: "30%" }  :{ marginTop: "120px",marginLeft:"20%" }}><h5 style={{color:"#5f6368"}}>REMINDER</h5></div>
                <div className={classes}>
                    {notes.map(note =>
                        <DisplayAllNotes key={note.noteId} note={note} />
                    )}
                </div>
            </div>
        )
    }
}

export default Remainder
