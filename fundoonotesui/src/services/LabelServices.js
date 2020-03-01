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
        console.log("in label services",data);
        
        var token = localStorage.getItem("logintoken")
        return services.POST(labelsBaseURL, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    Deletelabel(id){
        console.log("in label services",id);
        
        var token = localStorage.getItem("logintoken")
        return services.DELETE(`${labelsBaseURL}/`+ id, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }

}