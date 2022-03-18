let express = require("express");
let {usersModel_create_post} = require("../controllers/usersControllers");

let usersRouter = express.Router();

usersRouter.post("/", usersModel_create_post);


module.exports = {
    usersRouter,
}