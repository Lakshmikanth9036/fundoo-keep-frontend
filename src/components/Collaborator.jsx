import React, { Component } from 'react'
import { Dialog, DialogContent, DialogActions, Button, Avatar, IconButton, InputBase, Divider } from '@material-ui/core'
import UserService from '../service/UserService'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CollaboratorService from '../service/CollaboratorService';
import CloseIcon from '@material-ui/icons/Close';

export class Collaborator extends Component {

    constructor(props) {
        super(props)

        this.state = {
            profileDetails: {},
            closeDialog: false,
            openDialog: true,
            profilePic: '',
            emailAddress: '',
        }
    }

    componentDidMount() {
        this.getProfileDetails();
        this.getProfilePic();
    }
    

    handleClose = () => {
        this.setState(prevState => ({
            closeDialog: !prevState.closeDialog,
            openDialog: !prevState.openDialog
        }))
    }

    getProfilePic = () => {
        UserService.getProfilePicService()
            .then(response => {
                this.setState({
                    profilePic: response.data.obj
                })
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    getProfileDetails = () => {
        UserService.getProfileDetailsService()
            .then(response => {
                this.setState({
                    profileDetails: response.data.obj
                })
            })
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onEnter = e => {
        if (e.charCode === 13) {
            //console.log(this.state.emailAddress+" --- "+this.props.note.noteId)
            CollaboratorService.addCollaboratorService(this.state.emailAddress,this.props.note.noteId)
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

    removeColl = (cId,mail) => {
       // console.log(cId+" -- "+this.props.note.noteId)
       CollaboratorService.deleteCollaboratorService(this.props.note.noteId,cId,mail)
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

    render() {
    
        return (
            <div>
                <Dialog open={this.state.openDialog} onClose={this.handleClose} fullWidth="true" >
                    <DialogContent>
                    <div className="colHeader">Collaborators</div>
                    <div className='colDiv'>
                        <Divider variant="middle"/>
                    </div>
                        <div className="owner">
                        <Avatar alt="Profilepic" src={this.state.profilePic} />
                          <div className='ownMail'>  {this.state.profileDetails.emailAddress} </div><div className='own'> (owner)</div>
                        </div>

                        <div style={{marginTop:'12px'}}>
                            {this.props.note.collaborators.map(col => 
                                <div  className='colMail'>
                                    <Avatar alt="Coll">C</Avatar>
                                    <div className='colMailId'>{col.to}</div>
                                    <div>
                                        <IconButton onClick={() => this.removeColl(col.cid,col.from)}>
                                            <CloseIcon fontSize="small"/>
                                        </IconButton>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="coll">
                            <IconButton disabled>
                                <PersonAddIcon  className='clr'/>
                             </IconButton>
                             <InputBase 
                                    style={{width:"70%"}}
                                    placeholder="Person or email to share with"
                                    onChange={this.handleChange}
                                    onKeyPress={this.onEnter}
                                    name="emailAddress"
                                    />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div>
                            <Button onClick={this.handleClose}>close</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Collaborator
