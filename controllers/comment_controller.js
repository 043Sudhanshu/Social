const comment=require('../models/comment');
const post=require('../models/post');
module.exports.create=function(req,res){

      post.findById(req.body.postid,function(err,POST){

        comment.create({content:req.body.content,userid:req.user.id,postid:req.body.postid},function(err,data){
            if(err){console.log("error while creating comment"); return;}
            POST.commentidarray.push(data);         // mongodb automatically push the comment's id into the array
            POST.save();                            // we have to save it to mongodb
           });
    });
   return res.redirect('back');

}