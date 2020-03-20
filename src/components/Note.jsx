import React, { Component } from 'react'
import NoteService from '../service/NoteService'
import { Card, Box, Container, AppBar, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem, CardHeader, CardContent, CardActions, CardActionArea, Chip, ExpansionPanelSummary, ExpansionPanel, ExpansionPanelDetails, Input, Button, ExpansionPanelActions } from '@material-ui/core';
import '../css/notes.scss';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Divider from '@material-ui/core/Divider';

class Note extends Component {

    token;
    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            note:{}
        }
    }

    noteChangeHandler = e => {
        let note = this.state.note
        note[e.target.name] = e.target.value
        this.setState({
            note
        })
    }

    createNoteHandler = e => {
        e.preventDefault()
        // let note = {}
        // note["title"] = ""
        // note["description"] = ""
        // this.setState({note: note})
        console.log(this.state.note)
    }

    componentDidMount() {
        this.token = JSON.parse(localStorage.getItem('response'));
        NoteService.getAllNoteService(this.token.token)
            .then(response => {
                console.log(response.data.obj)
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


    render() {
        const { notes } = this.state

        return (
            <div>

                <Container component="main" maxWidth="lg">
                    <AppBar position="fixed" color="inherit" >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className='menuButton'
                                color="inherit"
                                aria-label="open drawer">
                                <MenuIcon />
                            </IconButton>
                            <img className='nic' src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png" srcset="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_48dp.png 2x " alt="" aria-hidden="true" style={{ width: '40px', height: '40px' }}></img>
                            <h1 className='niciv'>Keep</h1>
                            <div className='search'>
                                <div className='searchIcon'>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    className='inputRoot'
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <IconButton
                                className='accBtn'
                                edge="end"
                                aria-label="account of current user"
                                aria-controls='primary-search-account-menu'
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Container>

                <Container className='contnr' component="main" maxWidth="lg">
                    <Card className="cnt" variant="outlined">
                        <ExpansionPanel TransitionProps={{unmountOnExit:true}}>
                            <ExpansionPanelSummary>
                                <Typography>Take a note...</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                    <input type="text" name="title" placeholder="Title" onChange={this.noteChangeHandler}/><br />
                                    <input type="text" name="description" placeholder="Tack a note..." onChange={this.noteChangeHandler}/>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                 <Button size="small" onClick={this.createNoteHandler}>close</Button> 
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Card>
                </Container>

                <Container className='container' component="main" maxWidth="lg">
                    {
                        notes.map(note =>
                            <Card className='cards' variant="outlined" >
                                <CardHeader title={note.title} />
                                <CardContent>
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        {note.description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    {
                                        note.labels.map(label =>
                                            <Chip label={label.labelName} onDelete={() => { }} />
                                        )
                                    }
                                </CardContent>
                                <CardActionArea disableSpacing>
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
                                </CardActionArea>
                            </Card>
                        )
                    }
                </Container>
            </div>
        )
    }
}

export default Note
