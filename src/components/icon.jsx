import React, { Component } from 'react'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { CardActionArea, IconButton, Popper, ClickAwayListener, MenuList, MenuItem, Card, Paper, Fade, Tooltip } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import NoteService from '../service/NoteService';
import AllLabels from './AllLabels';
import '../css/icons.scss'

export class Icon extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            value: false,
            changeColor: false,
            colors: [{name:"White",color:"fff"},{name:"Red",color:"f28b82"},{name:"Orange",color:"fbbc04"},{name:"Yellow",color:"fff475"},
                     {name:"Green",color:"ccff90"},{name:"Teal",color:"a7ffeb"},{name:"Blue",color:"cbf0f8"},{name:"Darkblue",color:"aecbfa"},
                     {name:"Purple",color:"d7aefb"},{name:"Pink",color:"fdcfe8"},{name:"Brown",color:"e6c9a8"},{name:"Gray",color:"e8eaed"}]
        }
    }

    handleToggle = () => {
        this.setState(
            prevState => ({ open: !prevState.open })
        )
    }

    handleClose = event => {
        if(this.anchorEl.contains(event.target)){
            return;
        }
        this.setState({ open: false })
    }

    handleToggleCloseColor = () => {
        this.setState({changeColor: !this.state.changeColor})
    }

    handleCloseColor = event => {
        if(this.anchorEl.contains(event.target)){
            return;
        }
        this.setState({ changeColor: false })
    }

    changeBackgroundColor = (data) => {
        console.log(data)
        console.log(this.props.nts.noteId)

        NoteService.changeNoteColorService(data,this.props.nts.noteId)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        this.handleToggleCloseColor()
    }

    moveToTrash = () => {
        var data = {value: !this.state.value}
        NoteService.moveToTrashService(this.props.nts.noteId,data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    moveToArchive = () => {
        var data = {value: this.state.value}
        NoteService.moveToArchiveService(this.props.nts.noteId,data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { open } = this.state
        const { colors } = this.state
        const buttonColor = colors.map(color => {
            return(
            <div key={color.name}>
                <div className="color">
                    <Tooltip title={color.name}>
                    <IconButton style={{backgroundColor: "#"+color.color}}
                        onClick = {() => this.changeBackgroundColor(color.color)}
                    />
                    </Tooltip>
                </div>
            </div>)
        })
        return (
            <div>
                <CardActionArea style={{ width: "100%" }} disableSpacing>
                    <div className="icon">
                    <IconButton>
                             <AddAlertOutlinedIcon  fontSize="small" />
                        </IconButton>
                        <Tooltip title="Color">
                        <IconButton onClick={this.handleToggleCloseColor}>
                            <ColorLensOutlinedIcon fontSize="small" />
                        </IconButton>
                        </Tooltip>
                        <Paper>
                            {
                                this.state.changeColor ?
                                <ClickAwayListener onClickAway={this.handleCloseColor}>
                                <Card className="colorBox">
                                    {buttonColor}
                                </Card>
                                </ClickAwayListener>:null
                            }
                        </Paper>
                        <IconButton
                         onClick={this.moveToArchive}>
                            <ArchiveOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton>
                            <CropOriginalOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton>
                            <PersonAddOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            buttonRef={node => { this.anchorEl = node }}
                            aria-label="show more"
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                            fontSize="small">
                            <MoreIcon />
                        </IconButton>
                        <Popper
                            open={open}
                            // placement="right"
                            anchorEl={this.anchorEl}
                            style={{ zIndex: 1 }}>
                            <Card>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList>
                                            <MenuItem onClick={this.moveToTrash}>Delete note</MenuItem>
                                            <PopupState variant="popper" popupId="demo-popup-popper" style={{ zIndex: 1 }}>
                                                {popupState => (
                                                    <div>
                                                        <MenuItem variant="contained"  {...bindToggle(popupState)}>
                                                            Add Label
                                                       </MenuItem>
                                                        <Popper style={{ zIndex: 1 }} {...bindPopper(popupState)} transition>
                                                            {({ TransitionProps }) => (
                                                                <Fade {...TransitionProps} timeout={350}>
                                                                    <Paper>
                                                                        <AllLabels nId={this.props.nts.noteId}></AllLabels>
                                                                    </Paper>
                                                                </Fade>
                                                            )}
                                                        </Popper>
                                                    </div>
                                                )}
                                            </PopupState>
                                        </MenuList>
                                </ClickAwayListener>
                            </Card>
                        </Popper>
                    </div>
                </CardActionArea>
            </div>
        )
    }
}

export default Icon
