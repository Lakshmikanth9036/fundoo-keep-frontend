import React, { Component } from 'react'
import '../css/createNote.scss'
import { Card, InputBase, Button, IconButton } from '@material-ui/core'
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NoteService from '../service/NoteService';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BrushIcon from '@material-ui/icons/Brush';

 class CreateNote extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            takeNote: false,
            title: '',
            description: ''
        }
    }

    handlerChange = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    expandTakeNote = () => {
        if(this.state.title !== '' || this.state.description !== ''){
            var note = {
                title: this.state.title,
                description: this.state.description
            }
            NoteService.createNoteService(note)
            .then(response => {
                console.log(response)
            })
        } 
        this.setState ({takeNote: !this.state.takeNote})
        this.props.parentCallback();
        window.location.reload(false);
    }

    render() {
        return (
            <div className='rootCont'>
                <div className='contnr'>
                    <Card variant="outlined" style={{borderRadius:"12px"}}>
                        {
                            !this.state.takeNote ?
                            <div className='inpDiv'>
                                <div className='inp'>
                                <InputBase
                                    placeholder="Take a note..."
                                    inputProps={{"aria-label":"naked"}}
                                    onClick={this.expandTakeNote}/>
                               
                             </div>
                             <IconButton>
                                    <CheckBoxIcon/>
                                </IconButton>
                                <IconButton>
                                    <BrushIcon/>
                                </IconButton>
                                <IconButton>
                                    <CropOriginalIcon/>
                                </IconButton>
                            </div> : null
                        }
                        {
                            this.state.takeNote ?
                            <div className='inpDiv1'>
                                <div className='inp1'>
                                <InputBase
                                    style={{width: "100%"}}
                                    placeholder="Title"
                                    onChange={this.handlerChange}
                                    name="title"
                                    multiline
                                    inputProps={{"aria-label":"naked"}}/>
                                    
                                <InputBase
                                    style={{width: "100%"}}
                                    placeholder="Take a note..."
                                    onChange={this.handlerChange}
                                    name="description"
                                    multiline
                                    inputProps={{"aria-label":"naked"}}/>
                                    </div>
                                    <div class='icbtn'>
                                       <div>
                                 <IconButton>
                                        <ColorLensIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton>
                                        <ArchiveIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton>
                                        <CropOriginalIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton>
                                        <PersonAddIcon fontSize="small" />
                                    </IconButton>
                                    </div> 
                                     <div className="close"><Button onClick={this.expandTakeNote}>close</Button></div>
                                </div>
                                  
                            </div> : null}
                    </Card>
                </div>
            </div>
        )
    }
}

export default CreateNote
