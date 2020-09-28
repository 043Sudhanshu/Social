const mongoose=require('mongoose');

const userSchema=new mongoose.model({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const user=mongoose.model('users',userSchema);

module.exports=user;