const user=require('../models/user');
const post=require('../models/post');

module.exports.home=function(req,res){

   post.find({})
   .populate('usr')
   .populate({
      path:'commentidarray',
      populate:({
         path:'userid'
      })
   })
   .exec(function(err,data){
      return res.render('home',{
      title:'home',
      posts:data
     });
   
   });

}
