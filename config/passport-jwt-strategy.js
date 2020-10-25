const passport=require('passport');
const passportJWTstrategy=require('passport-jwt').Strategy;

const ExtractJWT= require('passport-jwt').ExtractJwt;

const user=require('../models/user');

let opts={
       jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
       secretOrKey : 'Social'
}

passport.use(new passportJWTstrategy(opts,function(jwtpayload,done){

   const USER =  user.findById(jwtpayload._id);
   
   if(USER){
    return done(null,USER);
   }else{
    return done(null,false);
   }
}));

module.exports= passport;