import axios from 'axios'

var rootApi = 'http://localhost:8080/note/'

class NoteService{
    static getAllNoteService(token){
        var config = {
            headers: {"header": token }
        };
        return axios.get(`${rootApi}getallNotes`,config)
    }

    static createNoteService(token,data){
        var config = {
            headers: {"header": token }
        };
        // data=JSON.stringify(data)
        // console.log(data)
        return axios.post(`${rootApi}create`,data,{headers:config})
    }
}
export default NoteService