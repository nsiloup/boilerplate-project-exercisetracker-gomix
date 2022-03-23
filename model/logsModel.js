let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let logSchema = new Schema({
    username : String,
    count : Number,
    log : [{
        description : String,
        duration : Number,
        date : String,
    }],
    _num : {type : Number, index : true}

})

let LogsModel = mongoose.model("logsModel", logSchema);

module.exports = {
    LogsModel,
};