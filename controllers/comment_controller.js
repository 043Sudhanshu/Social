const comment=require('../models/comment');
const post=require('../models/post');
module.exports.create=function(req,res){
    console.log(req.body);
    comment.create({content:req.body.content,userid:req.user.id,postid:req.body.postid},function(err,data){
    });
    
    
   return res.redirect('back');
}