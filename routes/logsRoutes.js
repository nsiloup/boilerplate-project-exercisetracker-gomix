let express = require("express");
let { logsModel_create_logs, logsModel_get_range_N_limit } = require("../controllers/logsControllers");

let logsRouter = express.Router();

logsRouter.get("/:_id/logs/", logsModel_create_logs, logsModel_get_range_N_limit);
// logsRouter.get("/:_id/logs/?from=&to=&limit=", logsModel_create_get);

module.exports = {
    logsRouter,
}