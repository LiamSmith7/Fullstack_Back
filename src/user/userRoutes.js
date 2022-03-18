const { Router } = require("express");
const { addUser, login, update, remove } = require("./userController");
const { hashPass, decryptPass, checkToken } = require("../middleware");
const userRouter = Router();

userRouter.post("/login", decryptPass, login); // READ (CREDENTIALS LOGIN)

userRouter.post("/user", hashPass, addUser); // CREATE
userRouter.get("/user", checkToken, login); // READ (TOKEN LOGIN)
userRouter.put("/user", checkToken, update); // UPDATE
userRouter.delete("/user", checkToken, remove); // DELETE

module.exports = userRouter;
