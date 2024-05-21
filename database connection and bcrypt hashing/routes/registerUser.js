const express=require('express');
const User=require('../model/user');
const bcrypt = require('bcrypt');            // import bcrypt to hash password
const { body, validationResult } = require('express-validator');       // import express validator to validate new users

const router=express.Router();



router.post('/',body('name').isAlpha(),body('password').isLength({min:3,max:10}),body('email').isEmail(),(req,res)=>{
    const {password,name,email}=req.body;
    const errors = validationResult(req);                                   //check email and pass using validator then hash the password
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    bcrypt.hash(password, 10 , async function(err, hash) {
        if(err){
            res.status(400).json({status:'failed',message:err.message});
        }
        try {
            const newUser=await User.create({
                name,
                email,
                password:hash
            })
            res.status(201).json({newUser})
        } catch (error) {
            res.status(400).json({error})
        }
    });
})
router.post('/login',async(req,res)=>{     // handling the Login request
    const {email,password}=req.body;
    try {
        const fetchUser=await User.findOne({email:email})
        if(fetchUser){
            try {
                bcrypt.compare(password, fetchUser.password, function(err, result) {
                    // result == false
                    if(err){
                        res.status(400).json({status:'Failed',message:err.message})
                    }
                    if(result){
                        res.status(200).json({status:'Succesfully Logged in'});
                    }
                    else{
                        res.status(400).json({message:'Invalid Password'})
                    }
                });
            } catch (error) {
                res.status(400).json({message:'Invalid Credentials'})
            }
        }else{
            res.status(400).json({message:'Invalid Email'})
        }
    } catch (error) {
        res.status(400).json({message:'Something went wrong',error})
    }
})

module.exports=router;