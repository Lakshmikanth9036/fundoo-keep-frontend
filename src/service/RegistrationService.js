import React from 'react'
import Constants from '../constants/Constants'
import axios from 'axios'

function RegistrationService() {
    const regApi= 'http://localhost:8080/user/register'
    return axios.post(regApi)
}

export default RegistrationService
