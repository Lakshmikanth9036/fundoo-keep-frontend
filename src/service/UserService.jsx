import axios from 'axios'

var rootApi = 'http://localhost:8080/user/'

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
}
export default UserService
