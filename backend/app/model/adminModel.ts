const { Admin } = require("../schema/adminSchema");
const SHA256 = require('crypto-js/sha256');
const CryptoJS = require("crypto-js");
const { environment } = require('../../environment')
const nodemailer = require('nodemailer');

const get_Admin = async(param : any )=>{
    try{
        const responce = Admin.find(param);
        if(!responce) throw "No admin found"
        return responce;
    }
    catch(error){return{"error" : error}}

}


const add_Admin = async({email,user_name,password}:{email : string , user_name:string,password:string})=>{
    try{
        password = CryptoJS.AES.encrypt(JSON.stringify(password), environment.ADMIN_TOKEN).toString();

        const responce = await Admin.create({
            email , 
            user_name , 
            password
             });

        
        if(!responce) throw "Admin not created"
        return responce;

    }
    catch(error){return{"error":error}}
}


const userName_Update = async (id: string, user_name: any) => {
    try {

        const responce = await Admin.updateOne(
            { "_id": id },
            {
                $set: {
                    user_name,
                }
            });
        return responce;
    }
    catch (error) {
        return { "error": error }
    }
};


const new_Password = async ( email: string, newPassword: string ) => {
    try {

        const data = await Admin.find({
            $and: [
                { "email": email }
            ],
        });

        if (!data) {
            throw "User with this email not found"
        }

        else {
            const updatedPassword = await Admin.updateOne(
                { "_id": data[0].id },
                {
                    $set: {
                        "password": newPassword
                    }
                });
            return updatedPassword;
        }
    }
    catch (error: any) {
        throw new Error(error)
    }


};


const password_Update = async (id: any, currentPass: string, newPassword: string ) => {
    try {

        const data = await Admin.find({
            $and: [
                { "_id": id }
            ],
        });

        var bytes = CryptoJS.AES.decrypt(data[0].password, environment.ADMIN_TOKEN );
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (decryptedData.toString() != currentPass) {
            throw "Incorrect old password"
        }

        else {
            const updatedPassword = await Admin.updateOne(
                { "_id": id },
                {
                    $set: {
                        "password": newPassword
                    }
                });
            return updatedPassword;
        }
    }
    catch (error: any) {
        throw new Error(error)
    }
};



const sendMail = async(to_email : string , body : string , subject : string , html : string = '')=>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false, // use SSL
      port: 25, // port for secure SMTP 
      auth: {
        user: environment.HOST_EMAIL ,
        pass: environment.HOST_EMAIL_PASSWORD
      } , 
      tls: {
          rejectUnauthorized: false
      }

    });

    var mailOptions = {
      from: environment.HOST_EMAIL ,
      to: to_email,
      subject: subject,
      text: body,
      html : html
    };

    transporter.sendMail(mailOptions, function(error : any, info : any){
      if (error) {
        console.log(error);
        throw "Email Not Sent"
      } else {
        console.log('Email sent: ' + info.response);
        return info.response;
      }
    });
}


const activate = async(id : any )=>{
    try{
        const activateAccount = await Admin.updateOne(
            { "_id": id },
            {
                $set: {
                    "isActivated": true
                }
            });
        return activateAccount;



    }   
    catch(error : any){
        console.log(error)
        throw "Account not Activated"
    } 
}



export {
    add_Admin,
    get_Admin,
    userName_Update , 
    password_Update,
    new_Password , 
    sendMail,
    activate


}
