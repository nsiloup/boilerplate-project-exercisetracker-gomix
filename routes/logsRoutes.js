let express = require("express");
let { logsModel_create_logs, } = require("../controllers/logsControllers");

let logsRouter = express.Router();

logsRouter.get("/:_id/logs/", logsModel_create_logs);

module.exports = {
    logsRouter,
}