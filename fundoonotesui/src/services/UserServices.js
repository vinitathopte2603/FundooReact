import AxiosServices from './AxiosServices'
const userAccountBaseURL="http://localhost:53715/api/Accounts/";
const notesBaseURL="http://localhost:53715/api/Notes";
let services = new AxiosServices()

export default class UserServices{
    Register(data){
        console.log("data in service",data)
                var token = "";
        return services.POST(`${userAccountBaseURL}/registration`,data,token)
    }
    Login(data){
        console.log("data in loginservice",data)
        var token="";
        return services.POST(`${userAccountBaseURL}/Login`,data,token)
    }
    ForgotPassword(data){
        console.log("data in password service",data)
        var token="";
        return services.POST(`${userAccountBaseURL}/ForgotPassword`,data,token)
    }
    ResetPassword(data,token){
        console.log("in reset services",data,token);
        return services.POST(`${userAccountBaseURL}/ResetPassword`,data,{headers: { 'Content-Type':'application/json','Accept':'*',
        Authorization: 'Bearer '+ token}} )
    }
    GetAllNotes(token){
        var data ="";
        console.log("token in services",token);
        
        return services.GET(notesBaseURL,{headers: { 'Content-Type':'application/json','Accept':'*',
        Authorization: 'Bearer '+ token}})
    }
}

