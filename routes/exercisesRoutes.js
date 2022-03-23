let express = require("express");
let {exercisesModel_create_post, } = require("../controllers/exercisesControllers");

let exercisesRouter = express.Router();

exercisesRouter.post("/:_id/exercises", exercisesModel_create_post)

module.exports = {
    exercisesRouter
};