import React, { Component } from 'react'
import NoteService from '../service/NoteService'
import { Container, AppBar, Toolbar, IconButton, InputBase } from '@material-ui/core';
import '../css/notes.scss';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CreateNote from './CreateNote';
import DisplayAllNotes from './DisplayAllNotes';

class Note extends Component {

    render() {
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
                
                <div>
                    <CreateNote/>
                </div>

                <div>
                    <DisplayAllNotes/>
                </div>
            </div>
        )
    }
}

export default Note
