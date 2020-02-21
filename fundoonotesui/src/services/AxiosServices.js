import axios from 'axios'

export default class AxiosServices {

    GET(path, token) {
        console.log("gedhdthdgbt", token);

        return axios.get(path, token);
    }
    POST(path, data, token) {
        console.log("hgdg", data)
        console.log("token", token)

        return axios.post(path, data, token)
    }
    PUT(path, data, token) {
        console.log("id in the service", path, data)
        return axios.put(path, data, token)
    }
    DELETE(path, token) {
        console.log("HASGFHASVVSD", path);

        return axios.delete(path, token)
    }
}
