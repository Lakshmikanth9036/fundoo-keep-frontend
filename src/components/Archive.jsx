import React, { Component } from 'react'
import NoteService from '../service/NoteService'
import DisplayAllNotes from './DisplayAllNotes'
import Nav from './Nav'
import CreateNote from './CreateNote'
import ViewContext from './ViewContext'

class Archive extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             notes: []
        }
    }

    static contextType = ViewContext;
    
    componentDidMount() {
       this.getArchiveNote();
    }

    getArchiveNote = () => {
        NoteService.getArchivedNoteService()
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
    
    getParentCallback = () => {
        this.getArchiveNote();
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
                        <Nav/>
                    </div>
                <div>
                    <CreateNote/>
                </div>
                <div className="heading" style={this.context.view ? {marginLeft: "30%" } : {marginLeft:"23.5%"}}><h5 style={{color:"#5f6368"}}>Archive</h5></div>
                <div className={classes}>  
                    {notes.map(note => 
                    <DisplayAllNotes  key={note.noteId} parentCallback={this.getParentCallback} isArchive={true} note={note}/>
                    )}
                </div>
            </div>
        )
    }
}

export default Archive
