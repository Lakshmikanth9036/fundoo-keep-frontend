import React, { Component } from 'react'
import LabelService from '../service/LabelService'
import { MenuList, MenuItem, InputBase } from '@material-ui/core'
import NoteService from '../service/NoteService'

class AllLabels extends Component {

    constructor(props) {
        super(props)

        this.state = {
            labels: []
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
        NoteService.addLabelToNoteService(label,this.props.nId)
        .then(response => {
          console.log(response)
        })
        .catch(
            error => {
                console.log(error)
            }
        )
    }

    render() {
        const { labels } = this.state
        return (
            <div>
                <MenuList>
                    <MenuItem>
                        <InputBase
                            placeholder="Create Label"
                            onChange={this.handlerChange}
                            name="label"
                            inputProps={{ "aria-label": "naked" }} />
                        </MenuItem>
                    {
                        labels.map(label =>
                            <div key={label.labelId}>
                                <MenuItem onClick={() => this.addLabel(label)}>
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
