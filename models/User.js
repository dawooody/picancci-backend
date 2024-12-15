const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username : {type:String , required :true ,unique:true},
        email : {type:String , required :true ,unique:true},
        password : {type:String , required :true },
        isAdmin :{
            type :Boolean,
            default: false , 

        },
        phone:{type:String,required:true},
        
        resetPasswordCode: {
            type: String,
        },
        resetPasswordExpire: {
            type: Date,
        },
        resetPasswordVerified: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema)