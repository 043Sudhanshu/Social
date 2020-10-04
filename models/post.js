const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    usr:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }

},{timestamps:true});

const post=mongoose.model('post',postSchema);

module.exports=post;