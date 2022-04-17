const usrname = 'Ahmad';
const password = 'BMD123';
const cluster_name = "bmd-crud-app";
const database_name = "myFirstDatabase";

const environment = {    
    MONGOOSE_URL  : `mongodb+srv://${usrname}:${password}@${cluster_name}.fquus.mongodb.net/${database_name}?retryWrites=true&w=majority` , 
    ADMIN_TOKEN: "adminsecerest@key2login_secure" , 
    // Enter your email below
    HOST_EMAIL : "Your Email here",
    // Enter your password below
    HOST_EMAIL_PASSWORD : "Email Password"

}



export = { environment };