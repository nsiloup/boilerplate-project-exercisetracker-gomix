let mongoose = require("mongoose");
let Schema = mongoose.Schema;


let exercisesSchema = new Schema({
    username : String,
    description : String,
    duration : Number,
    date : String,
    _num : {type : Number, index : true}
});


let ExercisesModel = mongoose.model("ExercisesModel", exercisesSchema);

module.exports = {
    ExercisesModel
};