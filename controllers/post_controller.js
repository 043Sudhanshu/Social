const post=require('../models/post');
const comment=require('../models/comment');

module.exports.createPost=function(req,res){

    post.create({content:req.body.content,usr:req.user.id},function(err,POST){ });
     
    return res.redirect('back');
 }

 module.exports.delete=function(req,res){

    post.findById(req.query.id,function(err,POST){
     if(POST && POST.usr==req.user.id){  
         comment.deleteMany({postid:POST.id},function(err,COMMENT){});
        POST.remove();
        return res.redirect('back');
     }else{
       return res.redirect('back');
     }
    });


 }
