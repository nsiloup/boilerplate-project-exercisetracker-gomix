let express = require("express");
let {usersModel_create_post, usersModel_create_get} = require("../controllers/usersControllers");

let usersRouter = express.Router();

usersRouter.post("/", usersModel_create_post);
usersRouter.get("/", usersModel_create_get);


module.exports = {
    usersRouter,
}