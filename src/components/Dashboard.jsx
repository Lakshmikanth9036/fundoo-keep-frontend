import React, { Component } from 'react'
import CreateNote from './CreateNote';
import DisplayAllNotes from './DisplayAllNotes';
import Nav from './Nav';
import CollaboratorService from '../service/CollaboratorService';
import ViewContext from './ViewContext';
import { connect } from  'react-redux';
import * as actions from '../actions/index';

class Note extends Component {

    constructor(props) {
        super(props)

        this.state = {
            coll:[],
        }
    }

    static contextType = ViewContext;

    componentDidMount() {
        this.props.onInitOtherNote();
        this.props.onInitPinnedNote();
        this.getCollNotes();
    }

    // getAllPinnedNote = () => {
    //     NoteService.getAllPinnedNoteService()
    //         .then(response => {
    //             this.setState({
    //                 pinned: response.data.obj
    //             })
    //         })
    //         .catch(
    //             error => {
    //                 console.log(error)
    //             }
    //         )
    // }

    // getAllNote = () => {
    //     NoteService.getAllNoteService()
    //         .then(response => {
    //             this.setState({
    //                 notes: response.data.obj
    //             })
    //         })
    //         .catch(
    //             error => {
    //                 console.log(error)
    //             }
    //         )
    // }

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
        this.props.onInitOtherNote();
        this.props.onInitPinnedNote();
    }

    render() {

        const { notes, pinned } = this.props
        const { coll } = this.state
        let classes = ''

        if(this.context.view){
            classes = 'listCont'
        }
        else{
            classes = 'container'
        }

        return (
            <div style={{ height: '100%' }}>
                
                <div>
                    <Nav parentCallback={this.getParentCallback}/>
                </div>

                <div>
                    <CreateNote parentCallback={this.getParentCallback} />
                </div>

                {pinned.length ?
                    <div className="heading" style={this.context.view ? {marginLeft: "30%" }  : {marginLeft: "20%"}}><h5 style={{ color: "#5f6368" }}>PINNED</h5></div> : null}
                {pinned.length ?
                    <div className={classes}>
                        {pinned.map(note =>
                            <DisplayAllNotes isArchive={false} parentCallback={this.getParentCallback} note={note} />
                        )}
                    </div> : null
                }

                {pinned.length ?
                    <div className="heading" style={this.context.view ? {marginLeft: "30%" }  : {marginLeft: "20%"}}><h5 style={{ color: "#5f6368" }}>OTHERS</h5></div> : null}
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

const mapStateToProps = state => {
    return {
        notes: state.notes,
        pinned: state.pinned
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onInitOtherNote: () => dispatch(actions.getOtherNotes()),
       onInitPinnedNote: () => dispatch(actions.getPinnedNotes())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Note);
