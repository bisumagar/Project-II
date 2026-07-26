const mongoose = require("mongoose")
require("dotenv").config();

const mondbUrl = process.env.URL;

const connectDB=()=>{
    return mongoose.connect(mondbUrl);

}
    module.exports={connectDB};