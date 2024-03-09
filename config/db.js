const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
mongoose.set('strictQuery',true);

const db=async()=>{
    try{
        const connect=await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connected to DB");
    } catch{
        console.log("Error in connecting the DB");
        process.exit(1);
    }
};

module.exports=db;