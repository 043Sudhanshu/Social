const { Strategy } = require('passport');
const passport=require('passport');
const localstrategy=require('passport-local').Strategy;
const user=require('../models/user_schema');

passport.use(new localstrategy({
    usernameField:'email'
},function(Email,password,done){
   
    user.findOne({email:Email},function(err,USER){
        if(err){return done(err);}
        if(!USER || password!=USER.password){
            console.log("Invalid username/password");
          return done(null,false);
        }else{
         return done(null,USER);
        }
    });

}));

passport.serializeUser(function(USER,done){
    return done(null,USER.id);                         // user.id and user._id are same
});

passport.deserializeUser(function(id,done){
    user.findById(id,function(err,USER){
     if(err){
         return done(err);
     }
     return done(null,USER);
    });
});

module.exports.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    return res.redirect('/');
}

module.exports.setAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
   return next();
}


module.exports=passport;