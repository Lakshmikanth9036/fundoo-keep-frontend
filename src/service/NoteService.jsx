import axios from 'axios'

var rootApi = 'http://localhost:8080/note/'
const Token = JSON.parse(localStorage.getItem('Token'))

class NoteService{
    static getAllNoteService(){
        return axios.get(`${rootApi}getallNotes`, {headers: {"header": Token }})
    }

    static getAllPinnedNoteService(){
        return axios.get(`${rootApi}getallPinnedNotes`, {headers: {"header": Token }})
    }

    static getArchivedNoteService(){
        return axios.get(`${rootApi}getArchivedNotes`, {headers: {"header": Token }})
    }

    static getTrashNoteService(){
        return axios.get(`${rootApi}getTrashNotes`, {headers: {"header": Token }})
    }

    static createNoteService(data){
        return axios.post(`${rootApi}create`,data, {headers: {"header": Token }})
    }

    static addOrCreateLableService(data,nId){
        return axios.put(`${rootApi}add/label?nId=${nId}`,data,{headers: {"header": Token }})
    }

    static removeLabelFromNoteService(labelId,noteId){
        return axios.delete(`${rootApi}remove/label?labelId=${labelId}&noteId=${noteId}`,{headers: {"header": Token }})
    }

    static moveToTrashService(nId,data){
        return axios.put(`${rootApi}trash/${nId}`,data,{headers: {"header": Token }})
    }

    static restoreNoteFromTrashService(nId,data){
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

    static pinNoteService(nId){
        return axios.put(`${rootApi}pin/${nId}`,true,{headers: {"header": Token }})
    }

    static getNoteByTitleOrDescService(text){
        return axios.get(`${rootApi}getNoteByTitleAndDescription/${text}`)
    }

    static addRemainderService(data,nId){
        return axios.put(`${rootApi}add/remainder?nId=${nId}`,data,{headers: {"header": Token }})
    }

    static removeReminderService(nId){
        return axios.delete(`${rootApi}remove/remainder?nId=${nId}`,{headers: {"header": Token }})
    }

    static getRemainderNotesService(){
        return axios.get(`${rootApi}getRemainderNotes`, {headers: {"header": Token }})
    }
}
export default NoteService