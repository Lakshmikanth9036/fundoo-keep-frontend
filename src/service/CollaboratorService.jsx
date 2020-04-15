import axios from 'axios'

var rootApi = 'http://localhost:8080/collaborator/'
const Token = JSON.parse(localStorage.getItem('Token'))

class CollaboratorService {
  
    static addCollaboratorService(mail,nId){
        return axios.post(`${rootApi}add?emailAddress=${mail}&nId=${nId}`,true,{headers: {"header": Token }})
    }

    static deleteCollaboratorService(nId,cId){
        return axios.delete(`${rootApi}deleteCollaborator?cId=${cId}&nId=${nId}`,{headers: {"header": Token }})
    }

    static getCollNotesService(){
        return axios.get(`${rootApi}getCollNotes`,{headers: {"header": Token }})
    }
}

export default CollaboratorService
