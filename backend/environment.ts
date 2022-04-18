const usrname = 'Ahmad';
const password = 'BMD123';
const cluster_name = "bmd-crud-app";
const database_name = "myFirstDatabase";

const environment = {    
    // MONGOOSE_URL  : `mongodb+srv://${usrname}:${password}@${cluster_name}.fquus.mongodb.net/${database_name}?retryWrites=true&w=majority&ssl=true` , 
    // MONGOOSE_URL: "mongodb://test:test123@cluster0-shard-00-00.1cezz.mongodb.net:27017,cluster0-shard-00-01.1cezz.mongodb.net:27017,cluster0-shard-00-02.1cezz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-yvux9g-shard-0&authSource=admin&retryWrites=true&w=majority",

    MONGOOSE_URL : "mongodb://Ahmad:BMD123@bmd-crud-app-shard-00-00.fquus.mongodb.net:27017,bmd-crud-app-shard-00-01.fquus.mongodb.net:27017,bmd-crud-app-shard-00-02.fquus.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-11p6xo-shard-0&authSource=admin&retryWrites=true&w=majority" , 
    ADMIN_TOKEN: "adminsecerest@key2login_secure" , 
    // Enter your email below
    HOST_EMAIL : "abdullahquddusbmd@gmail.com",
    // Enter your password below
    HOST_EMAIL_PASSWORD : "Hareem123"

}



export = { environment };