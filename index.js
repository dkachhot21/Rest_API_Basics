const express=require("express");
const dotenv=require('dotenv').config();
const db=require("./config/db.js")
const bodyParser=require('body-parser');
const cors=require('cors');


const app=express();
const PORT=process.env.PORT || 3000;



//Connect to DB
db();



//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/mid",()=>{
    console.log("Middleware 1 Called")
})

//Routes

app.get( "/", (req,res)=>{
    res.send({message:"Welcome to the API"});
})

const postsRoutes=require('./routes/posts.js');
app.use('/post',postsRoutes);








app.listen(PORT);