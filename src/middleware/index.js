const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../user/userModel");
const { hash } = require("../utils");

exports.hashPass = async (req, res, next) => {
    try{
        console.log(req.body);
        req.body.pass = await hash(req.body.pass);
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error});
    }
}

exports.decryptPass = async (req, res, next) => {
    try{
        req.user = await User.findOne({ username: req.body.username });
        if(req.user && await bcrypt.compare(req.body.pass, req.user.pass))
            next();
        else
            throw new Error("Incorrect credentials");
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

exports.checkToken = async (req, res, next) => { 
    try{
        console.log("Checking token");
        req.token = req.header("Authorization").replace("Bearer ", "");
        req.user = await User.findById(jwt.verify(req.token, process.env.WEB_TOKEN_HASH)._id);
        if(req.user) next();
        else throw new Error("No user found.");
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}
