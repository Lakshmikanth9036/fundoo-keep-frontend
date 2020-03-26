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

    static moveToTrashService(nId,data){
        return axios.put(`${rootApi}trash/${nId}`,data,{headers: {"header": Token }})
    }

    static moveToArchiveService(nId,data){
        return axios.put(`${rootApi}archive/${nId}`,data,{headers: {"header": Token }})
    }

    static addLabelToNoteService(label,nId){
        return axios.put(`${rootApi}add/label?nId=${nId}`,label,{headers: {"header": Token }})
    }

    static changeNoteColorService(data,nId){
        return axios.put(`${rootApi}color?color=%23${data}&nId=${nId}`,true,{headers: {"header": Token }})
    }

    static updateNoteService(data,nId){
        return axios.put(`${rootApi}update/${nId}`,data,{headers: {"header": Token }})
    }
}
export default NoteService