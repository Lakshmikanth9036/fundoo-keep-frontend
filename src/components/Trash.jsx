import React, { Component } from 'react'
import DisplayAllNotes from './DisplayAllNotes'
import NoteService from '../service/NoteService'

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
    

    render() {

        const { notes } = this.state

        return (
            <div>
                {/* <div className="heading" style={{marginLeft:"13.5%"}}><h5 style={{color:"#5f6368"}}>Archive</h5></div>:null} */}
                <div className='container'>  
                    {notes.map(note => 
                    <DisplayAllNotes note={note}/>
                    )}
                </div>
            </div>
        )
    }
}

export default Trash
