const usrname = 'Ahmad';
const password = 'BMD123';
const cluster_name = "bmd-crud-app";
const database_name = "myFirstDatabase";

const environment = {    
    MONGOOSE_URL  : `mongodb+srv://${usrname}:${password}@${cluster_name}.fquus.mongodb.net/${database_name}?retryWrites=true&w=majority` , 
    ADMIN_TOKEN: "adminsecerest@key2login_secure" , 
    HOST_EMAIL : "abdullahquddusbmd@gmail.com",
    HOST_EMAIL_PASSWORD : "Hareem123"

}



export = { environment };