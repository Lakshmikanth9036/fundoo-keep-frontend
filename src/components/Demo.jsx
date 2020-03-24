import React, { Component } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default class PrimarySearchAppBar extends Component {
    classes = useStyles;
    constructor(props) {
        super(props)
    
        this.state = {
            isMenuOpen: false
        }
    }
    
   

    // handleProfileMenuOpen = event => {
    //     this.anchorEl = event.currentTarget;
    //     this.isMenuOpen = Boolean(this.anchorEl)
    //     console.log(this.anchorEl)
    //     console.log(this.isMenuOpen)
    // };

    handleMenuClose = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    };

    // menuId = 'primary-search-account-menu';
    // renderMenu = (
    //     <Menu
    //         anchorEl={this.anchorEl}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         id={this.menuId}
    //         keepMounted
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={this.isMenuOpen}
    //         onClose={this.handleMenuClose}
    //     >
    //         {console.log(this.anchorEl)}
    //         {console.log(this.isMenuOpen)}
    //         <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
    //         <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
    //     </Menu>
    // );

    render() {

        return (
            <div className={this.classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={this.classes.grow} />
                        <div className={this.classes.sectionDesktop}>
                            <IconButton
                                buttonRef={node => { this.anchorEl = node; }}
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={this.menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                {console.log(this.anchorEl)}
                                <MoreIcon />
                            </IconButton>
                            <Menu
                                anchorEl={this.anchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                id={this.menuId}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open="true"
                                onClose={this.handleMenuClose}
                            >
                                {console.log(this.anchorEl)}
                                {console.log(this.state.isMenuOpen)}
                                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.renderMenu}
            </div>
        );
    }
}