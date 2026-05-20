const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database is connected");
    }catch(error){
        console.log(error.message);
        process.exit(1)//1 because program stop by error, if 0 it means program ended successfully
    }
};

module.exports = connectDB;