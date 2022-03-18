require("./db/connection");
const express = require("express");
const cors = require("cors");
const personRouter = require("./person/personRoutes");
const userRouter = require("./user/userRoutes");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(personRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log("Listening on port " + port);
});