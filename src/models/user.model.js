import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { useReducer } from "react";

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
         unique : true ,
          lowercase : true ,
          trim : true ,
          index : true 
    },

    email : {
        type : String ,
        required : true ,
         unique : true ,
          lowercase : true ,
          trim : true ,
         
    },
    fullname : {
        type : String ,
        required : true ,
        lowercase : true ,
          trim : true ,
          index : true 
    },
    avatar : {
    type : String ,// cloundinary url
    required : true 

    },
    coverImage : {
        type : String 
    },
    watchHistory :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video'
    }],
    password :{
        type: String ,
        required : [true,"password is required "]
    },
    refreshToken : {
        type : String 
    }
} , {timestamps : true})

userSchema.pre("save" , async function (next){
      if (!this.isModified("password")) return next();


        this.password = await bcrypt.hash(password,10)
    
    next()
})

userSchema.methods.isCorrectPassword = async function(password) {
 return await bcrypt.compare(password, this.password)
}

userSchema.methods.refreshToken = function (){
return jwt.sign({
    id : this._id,
    email : this.email,
    username : this.username,
    fullname : this.fullname
},
  process.env.JWT_SECRET_KEY,
  {
    expiresIn : process.env.TOKEN_EXPIRY
  }
)
}

userSchema.methods.accessToken = function(){
  return jwt.sign({
    id : this._id,
    
},
  process.env.REFRESH_TOKEN ,
  {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
  }
)
}
export const User = mongoose.model('User' , userSchema)