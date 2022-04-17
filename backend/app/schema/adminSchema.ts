const mongoose = require("mongoose");


let adminSchema = mongoose.Schema(
    {
        email : {
            type : String , 
            required : true , 
            unique : true
        },

        user_name: {
            type: String,
            required: true,
            unique : true
        },
        password: {
            type: String,
            required: true,
            length: 300,
        } , 
        isActivated : {
            type : Boolean,
            required:  true,
            default : false,
        }
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model("ForgetPassAdmin", adminSchema);
export { }
module.exports = { Admin }
