import AxiosServices from './AxiosServices'

let services = new AxiosServices()

export default class UserServices{
    Register(data){
        console.log("data in service",data)
                var token = "";
        return services.POST("http://localhost:53715/api/Accounts/registration",data,token)
    }
}