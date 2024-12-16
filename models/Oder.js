const mongoose = require("mongoose");
const Product = require("./Product");
const { type } = require("os");

const OrderSchema = new mongoose.Schema(
    {
        UserId : {type:String , required :true },
        Products :[
            {
                ProductId:{
                    type :String,
                },
                quantity :{
                  type :Number,
                  default:1,
                },
            },
        ],
        
        amount :{ type: Number , required :true},
        adress :{ type: Object, required :true },
        status :{ type: String , default :"pending"},

       
    },
    {timestamps:true}
);

module.exports = mongoose.model("Order",OrderSchema)