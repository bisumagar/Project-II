const mongoose = require("mongoose")

const mondbUrl = "mongodb+srv://bishaldeveloper:Bhakta%40123@cluster0.7ygefag.mongodb.net/?appName=Cluster0";
const connectDB=()=>{
    return mongoose.connect(mondbUrl);

}
    module.exports={connectDB};