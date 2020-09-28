const user=require('../models/user_schema');

module.exports.profile=function(req,res){
    console.log(res.locals);
    return res.render('users_profile',{
      title:'user_profile'
    });
}
module.exports.create=function(req,res){
    
    user.find(req.body.email,function(err,data){
      if(!data){
        if(req.body.password==req.body.confirm_password){
            user.create({name:req.body.name,email:req.body.email,password:req.body.password},function(err,data){});
            return res.render('login');
        }
      }
      return res.render('signup');
    });

}