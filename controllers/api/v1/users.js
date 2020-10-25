const { response, json } = require('express');
const { ExtractJwt } = require('passport-jwt');
const user=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createsessionbyjwt=async function(req,res){
    const USER=await user.findOne({email:req.body.email});

    if( !USER || USER.password!=req.body.password){
        return res.status(422).json({
            message:"unauthorized"
        });
    }else{
        return res.status(200).json({
         message:"found the user",
         data:{
             token: jwt.sign(USER.toJSON(),'social',{expiresIn:'100000'})
         }
        });
    }
   
}