const user=require('../models/user');
const post=require('../models/post');

module.exports.home=function(req,res){

   post.find({})
   .sort('-createdAt')
   .populate('usr')
   .populate({
      path:'commentidarray',
      populate:({
         path:'userid'
      })
   })
   .exec(function(err,data){
      user.find({},function(err,users){
         return res.render('home',{
            title:'home',
            posts:data,
            all_users:users
      });
      
});
   });
}
