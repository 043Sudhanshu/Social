const passport=require('passport');
const oauthStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const user=require('../models/user');
const { response } = require('express');
const { doesNotMatch } = require('assert');

passport.use(new oauthStrategy({
    clientID:"165577702025-8v97i4jqdqqnq0fosr9276c22cu571lf.apps.googleusercontent.com",
    clientSecret:"3iqT5_6GFZHVaZcW9Bu9WXzY",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
   function(accessToken,refreshToken,profile,done){     // accessToken from google,refreshToken( RenewToken ),Profile will contain main information
     console.log(profile);
    user.findOne({email:profile.emails[0].value},function(err,USER){
        if(err){console.log("oauth",err); return;}
    
    //if user exist then put in req.user

    if(USER){
        return done(null,USER);
    }else{
        //if user do not exist,create the user and put it in req.user
        user.create({
            username:profile.displayName,
            email:profile.emails[0].value,
            password:crypto.randomBytes(20).toString('hex')
        },function(err,USER){
            if(err){console.log("oauth",err); return;}
    
            return done(null,USER);
        });
        
    }


    });

}));


module.exports=passport;
