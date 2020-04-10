import axios from 'axios'

var rootApi = 'http://localhost:8080/user/'
const Token = JSON.parse(localStorage.getItem('Token'))

class UserService{
    static registrationService(data) {
        const regApi = `${rootApi}register`
        return axios.post(regApi,data)
    }

   static loginService(data){
        const logApi = `${rootApi}login`
        return axios.put(logApi,data)
    }

    static forgotPwdService(data){
        const forgotPwdApi = `${rootApi}forgotpassword?emailAddress=${data}`
        return axios.post(forgotPwdApi)
    }

    static resetPwddService(token,data){
        const resetPwdApi = `${rootApi}resetpassword/${token}/?newPassword=${data}`
        return axios.put(resetPwdApi)
    }

    static getProfilePicService(){
        return axios.get(`${rootApi}getProfile`, {headers: {"header": Token }})
    }

    static getProfileDetailsService(){
        return axios.get(`${rootApi}getProfileDetails`, {headers: {"header": Token }})
    }

    static uploadProfileService(file){
        return axios.post(`${rootApi}uploadProfile`,file,{headers: {"header": Token }});
    }
}
export default UserService
