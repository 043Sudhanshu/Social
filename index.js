const express=require('express');
const port=8000;
/****data base*****/
const db=require('./config/mongoose');
const user=require('./models/user_schema');

const app=express();

/***view***/
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

/*****routes****/
app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){console.log(`Error in running server: ${err}`);}
    console.log(`Server is running at port: ${port}`);
});