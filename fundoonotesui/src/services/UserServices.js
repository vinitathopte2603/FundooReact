import AxiosServices from './AxiosServices'

let services = new AxiosServices()

export default class UserServices{
    Register(data){
        console.log("data in service",data)
                var token = "";
        return services.POST("http://localhost:53715/api/Accounts/registration",data,token)
    }
    Login(data){
        console.log("data in loginservice",data)
        var token="";
        return services.POST("http://localhost:53715/api/Accounts/Login",data,token)
    }
    ForgotPassword(data){
        console.log("data in password service",data)
        var token="";
        return services.POST("http://localhost:53715/api/Accounts/ForgotPassword",data,token)
    }
    ResetPassword(data,token){
        console.log("in reset services",data,token);
        // var options ={ 
        //     }
            //  console.log("rvcer",options);
             
        return services.POST("http://localhost:53715/api/Accounts/ResetPassword",data,{headers: { 'Content-Type':'application/json',
        Authorization: 'Bearer '+ token}} )
    }
}