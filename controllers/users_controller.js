const user=require('../models/user');

const path=require('path');
const fs=require('fs');

module.exports.login=function(req,res){
  
  if(req.isAuthenticated()){
    return res.redirect('/');
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

module.exports.update= async function(req,res){
  // if(req.user.id == req.query.id){
  //   user.findByIdAndUpdate(req.query.id,req.body,function(err,USER){});
  //   req.flash('success','user updated');
  //   return res.redirect('back');
  // }
  // else{
  //   return res.status(401).send('Unauthorized');
  // }

  if(req.user.id == req.query.id){
  
  const USER=await user.findById(req.query.id);
  
  user.upload(req,res,function(err){
    console.log(req.file);
    USER.username=req.body.username;
    USER.email=req.body.email;
    if(req.file){

      if(USER.avatar){
         fs.unlinkSync(path.join(__dirname,"..",USER.avatar));
      }

     USER.avatar="/uploads/users/avatars/"+ req.file.filename;
    }
    USER.save();        // we have to save to update
    return res.redirect('back');
  });
   


  }

}

module.exports.create=async function(req,res){
  const USER=await user.findOne({email:req.body.email});
   if(!USER && req.body.password==req.body.confirm_password){
    user.create(req.body,function(err,USER){});
   req.flash('success','user created');
    return res.render('login',{title:"login"});
 }else{
  return res.redirect('back');
 }
}

module.exports.createSession=function(req,res){
  req.flash('success','logged in successfully');
  return res.redirect('/');
}

module.exports.logout=function(req,res){
  req.logout();
  req.flash('success','logged out successfully');
  return res.redirect('/');
}
