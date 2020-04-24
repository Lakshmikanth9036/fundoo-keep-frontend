import React, { Component } from 'react'
import DisplayAllNotes from './DisplayAllNotes'
import Nav from './Nav'
import LabelService from '../service/LabelService'
import CreateNote from './CreateNote'
import ViewContext from './ViewContext'

class LabledNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: []
        }
    }

    static contextType = ViewContext;

    componentDidMount() {
       this.getLabeledNotes();
    }

    getLabeledNotes = () => {
        LabelService.getNotesOfLableService(this.props.location.state)
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
                    <Nav parentCallback={this.getLabeledNotes}/>
                </div>
                <div>
                    <CreateNote/>
                </div>
                <div className={classes} style={{ marginTop: "20px" }}>
                    {notes.map(note =>
                        <DisplayAllNotes parentCallback={this.getLabeledNotes} key={note.noteId} note={note} />
                    )}
                </div>
            </div>
        )
    }
}

export default LabledNotes
