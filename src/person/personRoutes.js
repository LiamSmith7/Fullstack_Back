const { Router } = require("express");
const { addPerson, listAllPeople, listPerson, updatePerson, deletePerson } = require("./personController");

const personRouter = Router();
personRouter.post("/person", addPerson); // CREATE 
personRouter.get("/person/", listAllPeople); // READ ALL
personRouter.get("/person/:key/:value", listPerson); // READ
personRouter.put("/person", updatePerson); // UPDATE
personRouter.delete("/person/:key/:value", deletePerson); // DELETE

module.exports = personRouter;