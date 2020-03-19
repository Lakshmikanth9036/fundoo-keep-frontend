import axios from 'axios'

var rootApi = 'http://localhost:8080/note/'

class NoteService{
    static getAllNoteService(token){
        var config = {
            headers: {"header": token }
        };
        console.log(config)
        return axios.get(`${rootApi}getallNotes`,config)
    }
}
export default NoteService