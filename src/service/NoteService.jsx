import axios from 'axios'

var rootApi = 'http://localhost:8080/note/'
const Token = JSON.parse(localStorage.getItem('Token'))

class NoteService{
    static getAllNoteService(){
        return axios.get(`${rootApi}getallNotes`, {headers: {"header": Token }})
    }

    static createNoteService(data){
        return axios.post(`${rootApi}create`,data, {headers: {"header": Token }})
    }

    static removeLabelFromNoteService(labelId,noteId){
        return axios.delete(`${rootApi}remove/label?labelId=${labelId}&noteId=${noteId}`,{headers: {"header": Token }})
    }
}
export default NoteService