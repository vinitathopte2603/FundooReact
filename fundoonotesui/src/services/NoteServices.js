import AxiosServices from './AxiosServices'
const notesBaseURL = "http://localhost:53715/api/Notes";
let services = new AxiosServices()

export default class NoteServices {
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
        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/AllArchive`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetAllTrash() {
        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/AllTrash`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetAllReminder() {
        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/reminder`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    CreateNote(data) {
        var token = localStorage.getItem("logintoken")
        return services.POST(notesBaseURL, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })

    }
    MoveToTrash(id, data) {
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id + `/trash`, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })

    }
    MoveToArchive(id, data) {
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id + `/Archived`, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    DeleteNote(id) {
        var token = localStorage.getItem("logintoken")
        return services.DELETE(`${notesBaseURL}/` + id, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    UpdateNote(id, data) {
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetAllLabelledNotes(id) {
        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/` + id + `/notebylabel`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    ChangeColour(data, id) {
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id + `/color`, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    ImageUpload(data, id) {
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id + `/Imageupload`, data, {
            headers: {
                'Content-Type': 'multipart/form-file', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    PinNote(id, data) {
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + id + `/Pinned`, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetPinned() {
        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/AllPin`, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    SearchNotes(data) {
        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}?keyword=` + data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    GetAllUser(data) {
        var token = localStorage.getItem("logintoken")
        return services.GET(`${notesBaseURL}/users?keyword=` + data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    AddCollaboration(noteid, data) {
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${notesBaseURL}/` + noteid + `/collaborate`, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    RemoveCollaboration(noteid, data) {
        var token = localStorage.getItem("logintoken")
        return services.DELETE(`${notesBaseURL}/` + noteid + `/removecollab/` + data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
}
