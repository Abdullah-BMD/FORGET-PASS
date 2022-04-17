const { 
	add_Admin , 
	get_Admin , 
	userName_Update  , 
	password_Update , 
    new_Password , 
    sendMail
} = require("../../model/adminModel");

const { emptyFieldValidation } = require("../../validators/customValidators")
const { validateToken } = require("../../validators/tokenValidator")
const { environment } = require('../../../environment')
const SHA256 = require('crypto-js/sha256');
const { adminLogin } = require("../../auth")
const CryptoJS = require("crypto-js");
import * as jwt from 'jsonwebtoken';


const adminResolvers = {
	query : {
        loginAdmin: async (parent: any, args: any, { ctx }: any) => {

            const res = await emptyFieldValidation(args, ['username', 'password'])
            if (res === 'success') {
                const response = await adminLogin(args)
                return response; }
        },


        verifyLogin : async (parent: any, args: any, { ctx }: any)=>{
            const res = await validateToken(ctx);
            // const res = 'success'
            if(res === 'success'){ return { access: true } }
            else{ return { access : false } }

            } , 

        getAdmins: async (parent: any, args: any, { ctx }: any) => {
           const res = await validateToken(ctx)
           // const res = 'success';
           if (res === 'success'){
                const response = await get_Admin({});

                return response; }
             }


	} , 
	mutations : {
        createAdmin: async (parent: any, args: any, { ctx }: any) => {
            const response = await add_Admin(args.values)
            console.log('--->' , response);
            return response; },


        updateUsername: async (parent: any, args: any, { ctx }: any) => {

            // const res = await validateToken(ctx);
            const res = 'success'
            if (res === 'success') {
                const res = await emptyFieldValidation(args, ['username'])
                if (res === 'success') {
                    const result = await userName_Update(args.id, args.username )

                    if (result.modifiedCount === 1) return {  updated: true }
                    else return {  updated: false }
                }
            }

        },


        updatePassword: async (parent: any, args: any, { ctx }: any) => {

            // const res = await validateToken(ctx);
            const res = 'success'

            if (res === 'success') {

                const res = await emptyFieldValidation(args, ['current_password', 'new_password'])

                if (res === 'success') {
                    let cipherNewPassword = CryptoJS.AES.encrypt(JSON.stringify(args.new_password), environment.ADMIN_TOKEN).toString();
                    const result = await password_Update(args.id, args.current_password, cipherNewPassword)

                    if (result.modifiedCount === 1) return {  updated: true }
                    else return {  updated: false }
                }
            }

        },

        newPassword : async(parent: any, args: any, { ctx }: any) => {
                const res = await emptyFieldValidation(args, ['email', 'new_password'])
                if(res === 'success'){
                    let cipherNewPassword = CryptoJS.AES.encrypt(JSON.stringify(args.new_password), environment.ADMIN_TOKEN).toString();                    
                    const result = await new_Password(args.email , cipherNewPassword)
                    console.log(result);
                    if (result.modifiedCount === 1) return {  updated: true }
                    else return {  updated: false }

                }

        } , 

        sendCode : async(parent: any, args: any, { ctx }: any) => {
            const result = await sendMail(args.reciepent , args.body , args.subject)
            console.log('Resolver :' , result);
            return {  sent: true };
        }




	}
}


export {
	adminResolvers
}