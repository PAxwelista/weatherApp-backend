var express = require('express');
var router = express.Router();
const {checkBody} = require("../modules/checkBody")

const User = require("../models/users");

router.post("/signup", (req,res)=>{
    console.log("test")
    if (checkBody(req.body,["email","password"])){
        User.findOne({email : req.body.email})
            .then(data=>{
                if (data) res.json({ result: false, error: 'User already exists' });
                else{
                    const newUse = new User({
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.password
                    });
                    newUse.save()
                        .then(data=>{
                            if (data) res.json({result : true});
                            else res.json({result : false});
                        });
                };
            });
    }
    else res.json({result : false , error : "Missing or empty fields"});
});

router.post("/signin" , (req,res)=>{
    if (checkBody(req.body,["email","password"])){
        User.findOne({email : req.body.email , password : req.body.password})
            .then(data=>{
                if (data) res.json({result : true})
                else res.json({result : false, error : "user not found"});
            });
    }
    else res.json({result : false , error : "Missing or empty fields"});
});

module.exports = router;