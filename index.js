const express =require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoute = require("./routes/User");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const imagrouter =require("./routes/imageupload");
const { json } = require("body-parser");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");
const forgetpasswordRoute = require("./routes/forgetPassword");
const cors = require('cors');
dotenv.config();

mongoose
.connect(process.env.mongo_URL)
.then(()=> console.log("DBConnection  successfull!"))
.catch((err)=>{
    console.log(err);
});

 app.use(express.json());
 app.use ("/api/auth",authRoute);
 app.use ("/api/users",UserRoute);
 app.use("/api/products", productRoute);
 app.use("/api/img",imagrouter);
 app.use("/api/carts", cartRoute);
 app.use("/api/orders", orderRoute);
 app.use("/api/forgetPassword", forgetpasswordRoute);
 app.use(cors());
 
app.listen(process.env.PORT || 5000,()=>{
console.log("backend server is running !")
});