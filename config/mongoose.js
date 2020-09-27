const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Social');

const db=mongoose.connection;
db.on('error',()=>{
    console.log("Error in connecting to db");
});
db.once('open',()=>{
    console.log("Server is connected to database successfully");
})