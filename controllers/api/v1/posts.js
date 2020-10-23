const post=require('../../../models/post');
const user=require('../../../models/user');
const comment=require('../../../models/comment');

module.exports.dislayposts=async function(req,res){

  const POSTS=await post.find({});

    return res.status('200').json({
        "data":POSTS,
        "message":"posts"
    });
}


module.exports.deletepost=async function(req,res){

    const POST=await post.findById(req.query.id);

    await comment.deleteMany({postid:POST.id});
    POST.remove();
    return res.status(200).json({
        message:"post and related comments are deleted"
    });

}

