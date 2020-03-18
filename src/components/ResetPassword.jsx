import React from 'react'
import { useParams } from 'react-router-dom'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, Button } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import UserService from '../service/UserService'

function ResetPassword() {
    let { token } = useParams()
    const [values, setValues] = React.useState({
        newPassword: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const submitHandler = e => {
         e.preventDefault()
         UserService.resetPwddService(token,values.newPassword)
         .then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Card className='forgot' variant="outlined">
                <div className='hdr'>
                    <h2>
                        <span style={{ color: '#1a73e8' }}>F</span>
                        <span style={{ color: '#df1a1a' }}>u</span>
                        <span style={{ color: '#ffc107' }}>n</span>
                        <span style={{ color: '#1a73e8' }}>d</span>
                        <span style={{ color: '#0fb12a' }}>o</span>
                        <span> </span>
                        <span style={{ color: '#df1a1a' }}>K</span>
                        <span style={{ color: '#e2b111' }}>e</span>
                        <span style={{ color: '#0fb12a' }}>e</span>
                        <span style={{ color: '#1a73e8' }}>p</span>
                    </h2>
                    <h4>Reset Password</h4>
                </div>
                <form method='put' onSubmit={submitHandler}>
                    <FormControl variant="outlined" size='small'>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name="newPassword"
                            className='mrgn'
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.newPassword}
                            onChange={handleChange('newPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl><br />
                    <Button className='bt2' href="/login" >Back</Button>
                    <Button className='bt1' type='submit' variant="contained" color="primary">Next</Button>
                </form>
            </Card>
        </div>
    )
}

export default ResetPassword
