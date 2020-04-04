import axios from 'axios'

var rootApi = 'http://localhost:8080/label/'
const Token = JSON.parse(localStorage.getItem('Token'))

class LabelService{
    static getAllLabelService(){
        return axios.get(`${rootApi}getAllLabel`,{headers: {"header": Token }})
    }

    static createLabelService(data){
        return axios.post(`${rootApi}create`,data,{headers: {"header": Token }})
    }

    static deleteLabelService(lid){
        return axios.delete(`${rootApi}delete?lid=${lid}`,{headers: {"header": Token }})
    }

    static getNotesOfLableService(lid){
        return axios.get(`${rootApi}getNotesOfLable?lid=${lid}`,{headers: {"header": Token }})
    }
}

export default LabelService