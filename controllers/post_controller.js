const post=require('../models/post');
const comment=require('../models/comment');

module.exports.createPost=async function(req,res){
   try{
      
    let Post=await post.create({content:req.body.content,usr:req.user.id});
    req.flash("success","Post published");
         if(req.xhr){
            return res.status(200).json({
               data:{
                  POST:Post
               },
               message:"json data"         
               });
         }
        
         return res.redirect('back');
   }
   catch(err){
      console.log(err);
      return;
   }
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
  try{
    let POST=await post.findById(req.query.id);
    if(POST && POST.usr==req.user.id){
    await comment.deleteMany({postid:req.query.id});
    POST.remove();
    req.flash('success','post and its comments are deleted');
    }
    return res.redirect('back');
   }
   catch(err){
      console.log(err);
      return;
   }
 }
