import axios from 'axios'

export default class AxiosServices {

    GET(path, data, token) {
        return axios.get(path, data, token);
    }
    POST(path, data,token) {
        console.log("hgdg", data)
        console.log("token",token)
        
        return axios.post(path, data,token)
    }
    deleteUserdata(id) {
        console.log("id in the service", id)
        return axios.delete("http://localhost:60404/api/Employee/deleteEmployee/" + id)
    }
    updateUserData(data) {
        console.log("jygvyh", data)
        return axios.put("http://localhost:60404/api/Employee", data,
            { headers: { 'Content-Type': 'application/json' } })
    }
}
