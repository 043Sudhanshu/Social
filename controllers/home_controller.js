const user=require('../models/user_schema');
module.exports.home=function(req,res){
   return res.render('home',{
      title:'home'
   });  
}