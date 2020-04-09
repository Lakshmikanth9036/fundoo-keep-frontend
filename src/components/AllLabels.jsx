import React, { Component } from 'react'
import LabelService from '../service/LabelService'
import { MenuList, MenuItem, InputBase, IconButton } from '@material-ui/core'
import NoteService from '../service/NoteService'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

class AllLabels extends Component {

    constructor(props) {
        super(props)

        this.state = {
            labels: [],
            labelName: ''
        }
    }

    handlerChange = e => {
        this.setState({ [e.target.name]: e.target.value, })
    }

    componentDidMount() {
        LabelService.getAllLabelService()
            .then(response => {
                this.setState({
                    labels: response.data.obj
                })
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    addLabel = (label) => {
        NoteService.addLabelToNoteService(label,this.props.note.noteId)
        .then(response => {
          console.log(response)
        })
        .catch(
            error => {
                console.log(error)
            }
        )
        this.props.parentCallback();
    }

    onEnterHandler = e => {
        if(e.charCode === 13){
            var data = {
                labelName: this.state.labelName
            }
            NoteService.addOrCreateLableService(data,this.props.note.noteId)
            .then(response => {
                console.log(response)
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
            this.props.parentCallback();
        }
    }

    render() {
        const { labels } = this.state
        return (
            <div> 

                <MenuList>
                    <div style={{marginLeft:"15px"}}>Label Note</div>
                    <MenuItem>
                        <InputBase
                            placeholder="Create Label"
                            onChange={this.handlerChange}
                            onKeyPress={this.onEnterHandler}
                            name="labelName"
                            inputProps={{ "aria-label": "naked" }} />
                        </MenuItem>
                    {
                        labels.map(label =>
                            <div key={label.labelId}>
                                <MenuItem style={{height:"30px"}}>
                                    <IconButton onClick={() => this.addLabel(label)} style={{left:"-12px"}}>
                                    {
                                        this.props.note.labels.some(lbl => lbl.labelName === label.labelName) ?
                                            <CheckBoxOutlinedIcon fontSize="small"/> :  <CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>   
                                    }
                                    </IconButton>
                                    {label.labelName}
                                </MenuItem>
                            </div>
                        )
                    }
                </MenuList>
            </div>
        )
    }
}

export default AllLabels
