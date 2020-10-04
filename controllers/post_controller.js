const post=require('../models/post');


module.exports.createPost=function(req,res){

    post.create({content:req.body.content,usr:req.user.id},function(err,POST){
 
    });
     
    return res.redirect('back');
 }