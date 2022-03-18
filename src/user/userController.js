const User = require("./userModel");
const jwt = require("jsonwebtoken");
const { hash } = require("../utils");

const generateToken = (userID) => {
    //return jwt.sign({_id: newUser._id}, process.env.WEB_TOKEN_HASH);
    return jwt.sign({_id: userID}, process.env.WEB_TOKEN_HASH);
}

// ============================================= //
//      CREATE
// ============================================= //
exports.addUser = async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        res.status(200).send({user: newUser.username, token: generateToken(newUser._id)});
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

// ============================================= //
//      READ
// ============================================= //
exports.login = async (req, res) => {
    try{
        console.log(req.user);
        res.status(200).send({user: req.user.username, token: (req.token || generateToken(req.user._id))});
    }
    catch (error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

// ============================================= //
//      UPDATE
// ============================================= //
exports.update = async (req, res) => {
    try {
        // Hash the updated password if it exists
        console.log("Updating...");
        if(req.body.pass) req.body.pass = await hash(req.body.pass);

        const updatedPerson = await User.updateOne(req.user, req.body);
        if(updatedPerson.modifiedCount > 0)
            res.status(200).send({message: "Update successful!"});
        else{
            res.status(500).send({err: "Nothing was changed."});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

// ============================================= //
//      REMOVE
// ============================================= //
exports.remove = async (req, res) => {
    try {
        const deletedPerson = await User.deleteOne(req.user);
        res.status(200).send({message: "Goodbye!"});
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}