const mongoose=require('mongoose');

const multer=require('multer');
const path=require('path');
const avatarpath=path.join(__dirname,"../uploads/users/avatars");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},{timestamps:true});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,avatarpath);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  userSchema.statics.upload = multer({ storage: storage }).single('avatar');   
  userSchema.statics.avatarpath=avatarpath;

const user=mongoose.model('users',userSchema);

module.exports=user;