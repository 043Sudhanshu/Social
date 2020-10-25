const express=require('express');
const port=8000;
const app=express();

/****data base*****/

const db=require('./config/mongoose');

/***view***/

const sass=require('node-sass-middleware');
app.use(sass({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:false,
    outputStyle:'extended',
    prefix:'/css'
}));

const path=require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const layouts=require('express-ejs-layouts');
app.use(layouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

/***middleware***/

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
/**passport-authetication / express-session (session-cookie) / mongostore ***/

const passport=require('passport');
const passportLocalStrategy=require('./config/passport-local-strategy');
const session=require('express-session');
const mongoStore=require('connect-mongo')(session);

app.use(session({
   name:'Social',
   secret:'CHAUHANSUDHANSHU',
   saveUninitialized:false,
   resave:false,
   cookie:{
   maxAge:(1000*60*60)
   },
   store:(new mongoStore({
     mongooseConnection:db,
     autoRemove:'disabled'
   },function(err){console.log(err || "connected to mongostore") }))
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUserToLocals);

const passportJWTstrategy=require('./config/passport-jwt-strategy');

const passportOauth2startegy=require('./config/passport-google-oauth');

/**for noty notification */
const flash=require('connect-flash');
app.use(flash());
app.use(function(req,res,next){
  
  res.locals.flash={
    'success':req.flash('success'),
    'error':req.flash('error')
  }
  next(); 
});

/*****routes****/
app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){console.log(`Error in running server: ${err}`);}
    console.log(`Server is running at port: ${port}`);
});