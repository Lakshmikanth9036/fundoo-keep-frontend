import React, { Component } from 'react'
import Constants from '../constants/Constants'
import axios from 'axios'

var rootApi = 'http://localhost:8080/user/'

class UserService{
    registrationService(data) {
        const regApi = `${rootApi}register`
        return axios.post(regApi,data)
    }

    loginService(data){
        const logApi = `${rootApi}login`
        return axios.put(logApi,data)
    }
}
export default UserService
