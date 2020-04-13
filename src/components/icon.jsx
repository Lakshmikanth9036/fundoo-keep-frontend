import React, { Component } from 'react'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import { CardActionArea, IconButton, Popper, ClickAwayListener, MenuList, MenuItem, Card, Paper, Fade, Tooltip, Button, Snackbar } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import NoteService from '../service/NoteService';
import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from '@material-ui/icons/Close';
import AllLabels from './AllLabels';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    TimePicker,
} from '@material-ui/pickers';
import '../css/icons.scss'
import '../css/reminder.scss'

export class Icon extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            value: false,
            archive: false,
            isReminder: false,
            changeColor: false,
            selectedDate: new Date(),
            selectedTime: new Date(),
            colors: [{ name: "White", color: "fff" }, { name: "Red", color: "f28b82" }, { name: "Orange", color: "fbbc04" }, { name: "Yellow", color: "fff475" },
            { name: "Green", color: "ccff90" }, { name: "Teal", color: "a7ffeb" }, { name: "Blue", color: "cbf0f8" }, { name: "Darkblue", color: "aecbfa" },
            { name: "Purple", color: "d7aefb" }, { name: "Pink", color: "fdcfe8" }, { name: "Brown", color: "e6c9a8" }, { name: "Gray", color: "e8eaed" }]
        }
    }

    handleToggle = () => {
        this.setState(
            prevState => ({ open: !prevState.open })
        )
    }

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false })
    }

    handleToggleCloseColor = () => {
        this.setState({ changeColor: !this.state.changeColor })
    }

    handleCloseColor = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ changeColor: false })
    }

    reminderHandler = () => {
        this.setState({ isReminder: !this.state.isReminder })
    }

    // remindercloseHandler = e => {
    //     if (this.anchorEl.contains(e.target)) {
    //         return;
    //     }
    //     this.setState({ isReminder: false })
    // }

    handleDateChange = (date) => {

        this.setState({
            selectedDate: date
        })
    }

    handleTimeChange = (time) => {
        this.setState({
            selectedTime: time
        })
    }

    setRemainder = () => {
        var date = this.state.selectedDate.getFullYear() + "-" +
            ("00" + (this.state.selectedDate.getMonth() + 1)).slice(-2) + "-" +
            ("00" + this.state.selectedDate.getDate()).slice(-2);

        //[  date.getFullYear(),
        //     date.getMonth()+1,
        //     date.getDate()].join('-');
        var time = ("00" + this.state.selectedTime.getHours()).slice(-2) + ":" +
            ("00" + this.state.selectedTime.getMinutes()).slice(-2) + ":" +
            ("00" + this.state.selectedTime.getSeconds()).slice(-2);

        // [time.getHours(),
        // time.getMinutes(),
        // time.getSeconds()].join(':');
        
        var remainder = {
            reminder: date + "T" + time
        }
        NoteService.addRemainderService(remainder, this.props.nts.noteId)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        this.props.parentCallback();
        this.reminderHandler()
    }

    changeBackgroundColor = (data) => {
        NoteService.changeNoteColorService(data, this.props.nts.noteId)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.props.parentCallback();
        this.handleToggleCloseColor();

    }

    moveToTrash = () => {
        var data = { value: !this.state.value }
        NoteService.moveToTrashService(this.props.nts.noteId, data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        this.props.parentCallback();
    }

    moveToArchive = () => {
        var data = { value: this.state.value }
        NoteService.moveToArchiveService(this.props.nts.noteId, data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        this.handleSnackClose();
        this.props.parentCallback();
    }

    handleSnackClose = () => {
        this.setState(prevState => {
            return { archive: !prevState.archive }
        })
    }

    callBack = () => {
        this.props.parentCallback();
    } 

    render() {
        const { open } = this.state
        const { colors } = this.state
        const buttonColor = colors.map(color => {
            return (
                <div key={color.name}>
                    <div className="color">
                        <Tooltip title={color.name}>
                            <IconButton style={{ backgroundColor: "#" + color.color }}
                                onClick={() => this.changeBackgroundColor(color.color)}
                            />
                        </Tooltip>
                    </div>
                </div>)
        })
        return (
            <div className="ic">
                <CardActionArea style={{ width: "100%" }} disableSpacing>
                    <div className="icon">

                        <IconButton onClick={this.reminderHandler}>
                            <AddAlertOutlinedIcon fontSize="small" />
                        </IconButton>

                        <Popper
                            open={this.state.isReminder}
                            placement='bottom-end'
                            anchorEl={this.anchorEl}
                            style={{ zIndex: 1 }}>
                            <Card className="reminder">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        margin="normal"
                                        label="Date picker inline"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                    />
                                    <TimePicker
                                        variant="inline"
                                        format="HH:mm:ss"
                                        label="Inline mode"
                                        value={this.state.selectedTime}
                                        onChange={this.handleTimeChange}
                                    />
                                </MuiPickersUtilsProvider>
                                <div className="btnPos">
                                    <Button onClick={this.setRemainder}>Done</Button>
                                </div>
                            </Card>
                        </Popper>
                        <IconButton onClick={this.handleToggleCloseColor}>
                            <ColorLensOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Paper>
                            {
                                this.state.changeColor ?
                                    <ClickAwayListener onClickAway={this.handleCloseColor}>
                                        <Card className="colorBox">
                                            {buttonColor}
                                        </Card>
                                    </ClickAwayListener> : null
                            }
                        </Paper>

                        <IconButton
                            onClick={this.moveToArchive}>
                            {
                                this.props.isArchive ?
                                    <UnarchiveOutlinedIcon fontSize="small" /> :
                                    <ArchiveOutlinedIcon fontSize="small" />
                            }
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
                                {/* <ClickAwayListener onClickAway={this.handleClose}> */}
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
                                                                    <AllLabels parentCallback={this.callBack} note={this.props.nts}></AllLabels>
                                                                </Paper>
                                                            </Fade>
                                                         )} 
                                                    </Popper>
                                                </div>
                                            )}
                                        </PopupState>
                                    </MenuList>
                                {/* </ClickAwayListener> */}
                            </Card>
                        </Popper>
                    </div>
                </CardActionArea>
                <Snackbar
                    // key={messageInfo ? messageInfo.key : undefined}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.archive}
                    autoHideDuration={6000}
                    onClose={this.handleSnackClose}
                    message={this.props.isArchive ? "Note unarchived" : "Note archived"}
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={this.handleSnackClose}>
                                UNDO
                                        </Button>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleSnackClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        )
    }
}

export default Icon
