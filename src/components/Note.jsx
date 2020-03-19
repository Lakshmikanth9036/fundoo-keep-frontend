import React, { Component } from 'react'
import NoteService from '../service/NoteService'
import { Card, Box, Container, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import '../css/notes.scss';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

class Note extends Component {

    token ;
    constructor(props) {
        super(props)
    
        this.state = {
             notes: [],
             errorMsg: ''
        }
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
            <Container component="main" maxWidth="lg">
                <AppBar position="fixed" color="transparent" >
                    <Toolbar>
                        <IconButton
                             edge="start"
                             className='menuButton'
                             color="inherit"
                             aria-label="open drawer">
                             <MenuIcon/>
                        </IconButton>
                        <img className='nic' src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png" srcset="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_48dp.png 2x " alt="" aria-hidden="true" style={{width:'40px',height:'40px'}}></img>
                        <h1 className='niciv'>Keep</h1>
                        <div className='search'>
                            <div className='searchIcon'>
                                <SearchIcon/>
                            </div>
                        </div>
                        
                    </Toolbar>
                </AppBar>
             <Container component="main" maxWidth="xs">
                <Box className='notes' color="text.primary">
                {
                    notes.map(note => 
                        <Card className='cards' variant="outlined" >
                            <div key={note.noteId}>
                                {note.title}
                                {note.description}<br/>
                            </div>
                        </Card>
                    )
                }
                </Box>
                </Container>
            </Container>
        )
    }
}

export default Note
