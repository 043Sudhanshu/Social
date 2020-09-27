const express=require('express');
const port=8000;


const app=express();

// const path=require('path');
// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views'));

// app.use(express.urlencoded());
// app.use(express.static('assets'));

app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){console.log(`Error in running server: ${err}`);}
    console.log(`Server is running at port: ${port}`);
});