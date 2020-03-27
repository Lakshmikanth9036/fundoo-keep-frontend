import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, InputBase, Typography, Divider, ClickAwayListener } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../css/notes.scss';
import LabelService from '../service/LabelService';
import EditLabel from './EditLabel';

class Nav extends Component {

    constructor(props) {
        super(props)

        this.state = {
            labels: [],
            open: false,
            isTrash:false,
            isNote:false,
            isArchive:false,
            edit: false
        }
    }

    componentDidMount() {
        LabelService.getAllLabelService()
            .then(response => {
                this.setState({
                    labels: response.data.obj
                })
                console.log(response.data.obj)
            })
            .catch(
                error => {
                    console.log(error)
                }
        )
    }

    editLabel = () => {
        this.setState(prevState => ({
            edit: !prevState.edit
        }))
    }

    slideBarToggel = () => {
        this.setState(
            prevState => ({ open: !prevState.open })
        )
    }

    allNotes = () => {
        this.setState({isTrash: false, isArchive:true, isNote: false})
        this.props.history.push("/dashboard/note")
    }

    archive = () => {
        this.setState({isTrash: false, isArchive:true, isNote: false})
        this.props.history.push("/dashboard/archive")
    }

    trash = () => {
        this.setState({isTrash: true, isArchive:false, isNote: false})
        this.props.history.push("/dashboard/trash")
    }

    render() {
        return (
            <div>
                <AppBar position="fixed" style={{ backgroundColor: 'whitesmoke', zIndex: 1 }} >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.slideBarToggel}>
                            <MenuIcon style={{ color: 'black' }} />
                        </IconButton>
                        {
                            this.state.open ?
                                <div>
                                    <ClickAwayListener onClickAway={this.slideBarToggel}>
                                    <div className='slideBar' style={{ display: 'flex' }}>
                                        <div className='sideCont' >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
                                            </svg>
                                            <Typography variant="h6" noWrap style={{ color: "black", marginTop: '7px', marginLeft: '36px',fontSize:'1.1rem', fontWeight: '550' }}>
                                                Notes
                                        </Typography></div>
                                        <div className='sideCont'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                                                <path d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
                                            </svg>
                                            <Typography variant="h6" noWrap style={{ color: "black", marginLeft: '36px', fontSize:'1.1rem', fontWeight: '550' }}>
                                            Reminders
                                        </Typography></div>
                                        <div style={{marginBottom: '7px', marginTop:'7px'}}>
                                            <Divider/>
                                        </div>
                                        <div className='sideCont' style={{ color: '#5f6368' }}>Labels</div>
                                        <div>
                                        {
                                            this.state.labels.map(label =>
                                                <div className='sideCont' key={label.labelId} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
                                                    </svg>
                                                    <Typography variant="h6" noWrap style={{ color: "black", marginLeft: '36px' ,fontSize:'1.1rem', fontWeight: '550' }} >
                                                        {label.labelName}
                                                    </Typography>
                                                </div>
                                        )}
                                        </div>
                                        <div className='sideCont' onClick={this.editLabel}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="gb_Rc">
                                            <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
                                        </svg>
                                            <Typography variant="h6" noWrap style={{ color: "black", marginLeft: '36px', fontSize:'1.1rem', fontWeight: '550' }}>
                                            Edit Labels
                                        </Typography></div>
                                        <div style={{marginBottom: '7px', marginTop:'7px'}}>
                                            <Divider/>
                                        </div>
                                        <div className='sideCont' onClick={this.archive}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path></svg>
                                            <Typography variant="h6" noWrap style={{ color: "black", marginLeft: '36px',fontSize:'1.1rem', fontWeight: '550'  }}>
                                                Archive
                                        </Typography></div>
                                        <div className='sideCont'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                                                <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                                            </svg>
                                            <Typography variant="h6" noWrap style={{ color: "black", marginLeft: '36px',fontSize:'1.1rem', fontWeight: '550'  }}>
                                                Trash
                                        </Typography></div>
                                        <div className='sideCont' style={{color:'black', justifyContent:'center', marginTop:'-2px'}}>Logout</div>
                                        <div style={{marginBottom: '7px', marginTop:'7px'}}>
                                            <Divider/>
                                        </div>
                                        <div className='sideCont' style={{color:'black', justifyContent:'center', marginTop:'-2px'}}>Privacy · Terms Open-source licenses</div>
                                    </div>
                                    </ClickAwayListener>
                                </div> : null
                        }

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

                        <div className='iocbtns'>
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
                        </div>
                    </Toolbar>
                </AppBar>
                {this.state.edit ? <EditLabel labels={this.state.labels}/> : null}
            </div>
        )
    }
}

export default Nav
