let express = require("express");
let {logsModel_create_get} = require("../controllers/logsControllers");

let logsRouter = express.Router();

logsRouter.get("/:_id/logs", logsModel_create_get);

module.exports = {
    logsRouter,
}