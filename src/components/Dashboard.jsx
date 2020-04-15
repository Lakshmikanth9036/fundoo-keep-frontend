import React, { Component } from 'react'
import CreateNote from './CreateNote';
import DisplayAllNotes from './DisplayAllNotes';
import Nav from './Nav';
import NoteService from '../service/NoteService';
import CollaboratorService from '../service/CollaboratorService';

class Note extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            pinned: [],
            coll:[],
            list: false
        }
    }

    componentDidMount() {
        this.getAllNote();
        this.getAllPinnedNote();
        this.getCollNotes();
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

    getCollNotes = () => {
        CollaboratorService.getCollNotesService()
        .then(response => {
            this.setState({
                coll: response.data.obj
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

    changeListView = () => {
            this.setState(prevState => ({ list: !prevState.list }))
    }

    render() {

        const { notes, pinned, coll } = this.state
        let classes = ''

        if(this.state.list){
            classes = 'listCont'
        }
        else{
            classes = 'container'
        }

        return (
            <div style={{ height: '100%' }}>
                
                <div>
                    <Nav view={this.state.view}
                        changeView={this.changeListView}/>
                </div>

                <div>
                    <CreateNote parentCallback={this.getParentCallback} />
                </div>

                {pinned.length ?
                    <div className="heading" style={this.state.list ? {marginLeft: "30%" }  : {marginLeft: "20%"}}><h5 style={{ color: "#5f6368" }}>PINNED</h5></div> : null}
                {pinned.length ?
                    <div className={classes}>
                        {pinned.map(note =>
                            <DisplayAllNotes isArchive={false} parentCallback={this.getParentCallback} note={note} />
                        )}
                    </div> : null
                }

                {pinned.length ?
                    <div className="heading" style={this.state.list ? {marginLeft: "30%" }  : {marginLeft: "20%"}}><h5 style={{ color: "#5f6368" }}>OTHERS</h5></div> : null}
                <div className={classes} >
                    {
                        coll.map(note => 
                            <DisplayAllNotes 
                            isArchive={false} 
                            parentCallback={this.getParentCallback} 
                            note={note} 
                            />)
                    }
                    {notes.map(note =>
                        <DisplayAllNotes 
                        isArchive={false} 
                        parentCallback={this.getParentCallback} 
                        note={note} 
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default Note
