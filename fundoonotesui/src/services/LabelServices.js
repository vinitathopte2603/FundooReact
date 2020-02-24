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
}