import AxiosServices from './AxiosServices'
const labelsBaseURL = "http://localhost:53715/api/Label";
let services = new AxiosServices()

export default class LabelServices {
    GetAllLabels() {
        var token = localStorage.getItem("logintoken")
        return services.GET(labelsBaseURL, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    CreateLabel(data) {        
        var token = localStorage.getItem("logintoken")
        return services.POST(labelsBaseURL, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    Deletelabel(id){
        var token = localStorage.getItem("logintoken")
        return services.DELETE(`${labelsBaseURL}/`+ id, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    EditLabel(data,id){
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${labelsBaseURL}/`+ id, data,{
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }

}