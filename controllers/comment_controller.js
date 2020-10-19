const comment=require('../models/comment');
const post=require('../models/post');


module.exports.create=async function(req,res){
  try{
   let comm=await comment.create({content:req.body.content,userid:req.user.id,postid:req.body.postid});
   let POST=await post.findById(req.body.postid);
   POST.commentidarray.push(comm);
   POST.save();
   req.flash('success','comment published');
   return res.redirect('back');
  }
  catch(err){
  console.log(err);
  return;
  }
}

module.exports.delete=async function(req,res){
  try{
    
  let comm=await comment.findById(req.query.id);
  let postid=comm.postid;
  let userid=comm.userid;
      if(userid==req.user.id){
          await  post.findByIdAndUpdate(postid,{ $pull :{ commentidarray:req.query.id } });
          comm.remove();
          req.flash('success','comment deleted');
      }
          return res.redirect('back');
      }
  catch(err){
    console.log(err);
    return;
  }
}


























