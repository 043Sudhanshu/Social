const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    usr:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    commentidarray:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comments'
        }
    ]

},{timestamps:true});

const post=mongoose.model('posts',postSchema);

module.exports=post;