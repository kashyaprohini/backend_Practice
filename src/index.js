// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { app } from './app.js'
import express from 'express'
import connectDB from './db/index.js'

dotenv.config({
    path : './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log(`server is running at ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log(" db connection fail " , err)
})





// const app = express()


// ;( async () =>{
//     try {
//        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//        app.on("error" , (err)=>{
//         console.log("error" , err)
//         throw err
//        })

//        app.lister(process.env.PORT , () =>{
//         console.timeLog("app is listening")
//        })
//     } catch (error) {
//         console.log("error :" , error)
//     }
// })()