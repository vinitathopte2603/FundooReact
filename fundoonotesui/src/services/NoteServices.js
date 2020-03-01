import AxiosServices from './AxiosServices'
const notesBaseURL = "http://localhost:53715/api/Notes";
let services = new AxiosServices()

export default class NoteServices{
    GetAllNotes() {
        var token = localStorage.getItem("logintoken")
        return services.GET(notesBaseURL, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetAllArchive() {
        console.log("in archive");

        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/AllArchive`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetAllTrash() {
        console.log("in trash");

        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/AllTrash`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetAllReminder() {
        console.log("in reminder");

        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/reminder`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    CreateNote(data) {
        console.log("data in services");
        var token = localStorage.getItem("logintoken")
        return services.POST(notesBaseURL, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })

    }
    MoveToTrash(id, data) {
        console.log("services trash note", id, data);
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id + `/trash`, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })

    }
    MoveToArchive(id, data) {
        console.log("services trash note", id, data);
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id + `/Archived`, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    DeleteNote(id) {
        console.log("services delete forever note", id);
        var token = localStorage.getItem("logintoken")
        return services.DELETE(`${notesBaseURL}/` + id, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    UpdateNote(id,data){
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id,data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })  
    }
    GetAllLabelledNotes(id){
        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/`+id+`/notebylabel`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    ChangeColour(data,id){
        console.log("sdhcvgdgcv",data,id);
        
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id+`/color`,data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })  
    }
}