const user=require('../models/user');

module.exports.login=function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }else{
  return res.render('login',{
      title:'login'
    });
  }
}

module.exports.signup=function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }else{
  return res.render('signup',{
      title:'signup'
    });
  }
}

module.exports.profile=function(req,res){

    return res.render('users_profile',{
      title:'user_profile'
    });
}

module.exports.create=function(req,res){
   user.findOne({email:req.body.email},function(err,USER){
     if(!USER && req.body.password==req.body.confirm_password){
        user.create(req.body,function(err,USER){});
        return res.render('login',{title:"login"});
     }else{
      return res.redirect('back');
     }
   })
}

module.exports.createSession=function(req,res){
  return res.redirect('/');
}

module.exports.logout=function(req,res){
  req.logout();
  return res.redirect('/');
}
