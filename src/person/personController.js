const Person = require("./personModel");

// ============================================= //
//      ADD
// ============================================= //
exports.addPerson = async (req, res) => {
    try{
        console.log("Received post");
        const newPerson = await Person.create(req.body);
        res.status(200).send({person: newPerson});
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

// ============================================= //
//      LIST
// ============================================= //

const getPeople = async (res, query) => {
    try{
        console.log("Received get");
        const people = await Person.find(query);
        res.status(200).send({people});
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

exports.listPerson = async(req, res) => {
    getPeople(res, {[req.params.key]: req.params.value}); // Find specific
}

exports.listAllPeople = async (req, res) => {
    getPeople(res, {}); // Find all
}

// ============================================= //
//      UPDATE
// ============================================= //
exports.updatePerson = async (req, res) => {
    try {
        console.log("Received put");
        const updatedPerson = await Person.updateOne(req.body.find, req.body.update);
        res.status(200).send({person: updatedPerson});
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}

// ============================================= //
//      REMOVE
// ============================================= //
exports.deletePerson = async (req, res) => {
    try {
        console.log("Received delete");
        console.log(req.params.key + ": " + req.params.value);
        const deletedPerson = await Person.deleteOne({[req.params.key]: req.params.value});
        res.status(200).send({person: deletedPerson});
    }
    catch(error){
        console.log(error);
        res.status(500).send({err: error.message});
    }
}