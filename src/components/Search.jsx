import React, { Component } from 'react'
import Nav from './Nav'
import DisplayAllNotes from './DisplayAllNotes';
import NoteService from '../service/NoteService'

class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        this.getNoteByTitleOrDesc();
    }

    getNoteByTitleOrDesc = () => {
        NoteService.getNoteByTitleOrDescService(this.props.location.state)
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
        this.getNoteByTitleOrDesc();
    }

    render() {

        const { notes } = this.state

        return (
            <div>
                <div><Nav /></div>

                {notes !== null ?
                    <div className='container' style={{ marginTop: "120px" }}>
                        {
                            notes.map(note =>
                                <DisplayAllNotes parentCallback={this.getParentCallback} note={note} />
                            )
                        }
                    </div> :
                    <div style={{ marginTop: "120px", textAlign:"center",fontStyle:"italic", fontSize:"20px" }}>
                        No match found !!!!!
                    </div>
                }
            </div>
        )
    }
}

export default Search
