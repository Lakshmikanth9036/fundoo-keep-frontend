import React, { Component } from 'react'
import CreateNote from './CreateNote';
import DisplayAllNotes from './DisplayAllNotes';
import Nav from './Nav';
import NoteService from '../service/NoteService';

class Note extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             notes:[],
             pinned:[]
        }
    }
    
    componentDidMount() {
        this.getAllNote();
        this.getAllPinnedNote();
    }

    getAllPinnedNote = () => {
        NoteService.getAllPinnedNoteService()
            .then(response => {
                this.setState({
                    pinned: response.data.obj
                })
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    getAllNote = () => {
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

    getParentCallback = () => {
        this.getAllNote();
        this.getAllPinnedNote();
        window.location.reload(false);
    }

    render() {

        const { notes,pinned } = this.state

        return (
            <div style={{height: '100%'}}>
                    <div>
                        <Nav/>
                    </div>
                <div>
                    <CreateNote/>
                </div>

                {pinned.length ?
                <div className="heading" style={{marginLeft:"20%"}}><h5 style={{color:"#5f6368"}}>PINNED</h5></div>:null}
                {pinned.length ?
                <div className='container'>  
                    {pinned.map(note => 
                    <DisplayAllNotes parentCallback={this.getParentCallback} note={note}/>
                    )}
                </div> : null
                }

                {pinned.length ?
                <div className="heading" style={{marginLeft:"20%"}}><h5 style={{color:"#5f6368"}}>OTHERS</h5></div>:null}
                <div className='container'>  
                    {notes.map(note => 
                    <DisplayAllNotes parentCallback={this.getParentCallback} note={note}/>
                    )}
                </div>
            </div>
        )
    }
}

export default Note
