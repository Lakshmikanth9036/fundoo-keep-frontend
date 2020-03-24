import axios from 'axios'

var rootApi = 'http://localhost:8080/label/'
const Token = JSON.parse(localStorage.getItem('Token'))

class LabelService{
    static getAllLabelService(){
        return axios.get(`${rootApi}getAllLabel`,{headers: {"header": Token }})
    }
}

export default LabelService