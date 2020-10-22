const mongoose=require('mongoose');


const commentSchema=new mongoose.Schema({
     content:{
         type:String,
         required:true
        },
     userid:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'users'
     },
     postid:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'posts'
     }
},{timestamps:true});

const comment=mongoose.model('comments',commentSchema);
module.exports=comment;