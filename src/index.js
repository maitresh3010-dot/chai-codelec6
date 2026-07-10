   import dotenv from "dotenv"
   
   import connectDB from "./db/index.js";
import { app } from "./app.js";


   dotenv.config({
    path: './.env'
   })
   
   // require('dotenv').config()

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import connectDB from "./db";




connectDB()
.then(() => {
   const PORT = process.env.PORT || 8000
   app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`)
   })
}).catch((err) => {
   console.log("MONGO DB CONNECTION IS FAILED", err)
});


/*import express from "express"
const app = express();

;( async()=>{
     try{
     await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

     app.on("error", (error)=>{
        console.log("ERRR:", error)
        throw error
     })

     app.listen(process.env.PORT, ()=>{
          console.log(`app is listing on the port  ${process.env.PORT} `)
     })
      
     }  

     catch(error){
        console.error("ERROR:", error)

        throw err
     }
})()*/
