import React, { Component } from 'react';
import DisplayAllNotes from './DisplayAllNotes';
import Nav from './Nav';
import CreateNote from './CreateNote';
import ViewContext from './ViewContext';
import { connect } from  'react-redux';
import * as actions from '../actions/index';

class LabledNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: []
        }
    }

    static contextType = ViewContext;

    componentDidMount() {
        this.props.onInitLabeledNote(this.props.location.state)
    }

    // getLabeledNotes = () => {
    //     LabelService.getNotesOfLableService(this.props.location.state)
    //     .then(response => {
    //         this.setState({
    //             notes: response.data.obj
    //         })
    //     })
    //     .catch(
    //         error => {
    //             console.log(error)
    //         }
    //     )
    // }

    render() {

        const { notes } = this.props

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

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onInitLabeledNote: (state) => dispatch(actions.getLabeledNotes(state))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LabledNotes);
