const post=require('../models/post');
const comment=require('../models/comment');

module.exports.createPost=async function(req,res){
    await post.create({content:req.body.content,usr:req.user.id});
    return res.redirect('back');
 }



//  module.exports.delete=function(req,res){

//     post.findById(req.query.id,function(err,POST){
//      if(POST && POST.usr==req.user.id){  
//          comment.deleteMany({postid:POST.id},function(err,COMMENT){});
//         POST.remove();
//         return res.redirect('back');
//      }else{
//        return res.redirect('back');
//      }
//     });

//  }

 module.exports.delete=async function(req,res){

    let POST=await post.findById(req.query.id);
    if(POST.usr==req.user.id){
    await comment.deleteMany({postid:req.query.id});
    POST.remove();
    }
    return res.redirect('back');
 }
