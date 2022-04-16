const jwt = require("jsonwebtoken")
const SHA256 = require('crypto-js/sha256');
const { Admin } = require("../schema/adminSchema");
const { environment } = require("../../environment")
const CryptoJS = require("crypto-js");


const adminLogin = async (obj: any) => {
    try {
        const { username, password , model_name } = obj;

        const data = await Admin.find({
            $and: [{ user_name: username }]
        });

        if (data.length == 0) {
            throw ('Username not found')
        }

        else {
            var bytes = CryptoJS.AES.decrypt(data[0].password, environment.ADMIN_TOKEN );
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if (decryptedData !=  password ) {
                throw ('Password is incorrect')
            }
            else {
                const token = jwt.sign({ id: data[0]._id }, JSON.stringify(SHA256(environment.ADMIN_TOKEN).words), { expiresIn: '1d' });
                return {
                    authenticated: true,
                    token: token
                }
            }
        }
    }
    catch (error:any) {
        console.log(error, "error in auth")
        throw new Error(error)
    }
}

export {
    adminLogin
}