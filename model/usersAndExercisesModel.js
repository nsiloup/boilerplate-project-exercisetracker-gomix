let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let log = console.log;

let usersSchema = new Schema({
    username : String,
});
let exercisesSchema = new Schema({
    username : String,
    description : String,
    duration : Number,
    date : String,
    _id : String
});

let UsersModel = mongoose.model("UsersModel", usersSchema);

let ExercisesModel = mongoose.model("ExercisesModel", exercisesSchema);

module.exports = {
    UsersModel,
    ExercisesModel
};