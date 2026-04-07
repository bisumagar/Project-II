const mongoose = require("mongoose")

const mondbUrl = "mongodb+srv://bishaldeveloper:Bhakta%40123@cluster0.sxp9acy.mongodb.net/?appName=Cluster0";
const connectDB=()=>{
    return mongoose.connect(mondbUrl);

}
    module.exports={connectDB};