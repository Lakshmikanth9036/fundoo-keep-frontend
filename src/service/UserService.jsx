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

    static forgotPassService(data){
        const forgotPassApi = `${rootApi}forgotpassword?emailAddress=${data}`
        return axios.post(forgotPassApi)
    }
}
export default UserService
