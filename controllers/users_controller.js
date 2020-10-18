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
    const id=req.query.id;
    user.findById(id,function(err,USER){
      return res.render('users_profile',{
        title:'user_profile',
        u:USER
      });
    });
}

module.exports.update=function(req,res){
  if(req.user.id == req.query.id){
    user.findByIdAndUpdate(req.query.id,req.body,function(err,USER){});
    return res.redirect('back');
  }
  else{
    return res.status(401).send('Unauthorized');
  }
}

module.exports.create=async function(req,res){
  const USER=await user.findOne({email:req.body.email});
   if(!USER && req.body.password==req.body.confirm_password){
    user.create(req.body,function(err,USER){});
    return res.render('login',{title:"login"});
 }else{
  return res.redirect('back');
 }
}

module.exports.createSession=function(req,res){
  req.flash('success','log-in');
  return res.redirect('/');
}

module.exports.logout=function(req,res){
  req.logout();
  return res.redirect('/');
}
