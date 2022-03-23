let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usersSchema = new Schema({
    username : String,
    _num : {type : Number, index : true}
});

let UsersModel = mongoose.model("UsersModel", usersSchema);

module.exports = {
    UsersModel,
};