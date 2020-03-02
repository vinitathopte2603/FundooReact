import AxiosServices from './AxiosServices'
const userAccountBaseURL = "http://localhost:53715/api/Accounts/";
let services = new AxiosServices()

export default class UserServices {
    Register(data) {
        var token = "";
        return services.POST(`${userAccountBaseURL}/registration`, data, token)
    }
    Login(data) {
        var token = "";
        return services.POST(`${userAccountBaseURL}/Login`, data, token)
    }
    ForgotPassword(data) {
        var token = "";
        return services.POST(`${userAccountBaseURL}/ForgotPassword`, data, token)
    }
    ResetPassword(data, token) {
        return services.POST(`${userAccountBaseURL}/ResetPassword`, data, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
    profilePicture(data) {
        console.log("in profilepicture", data);
        var token = localStorage.getItem("logintoken")
        return services.PUT(`${userAccountBaseURL}/profilepicture`,data,{
            headers: {
                'Content-Type': 'multipart/form-file', 'Accept': '*',
                Authorization: 'Bearer ' + token
            }
        })
    }
}

