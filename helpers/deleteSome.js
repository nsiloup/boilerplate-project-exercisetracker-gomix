let {ExercisesModel} = require("../model/exercisesModel");
let {UsersModel} = require("../model/usersModel");
let log  = console.log;

//Limit to 9 users, by deleting the exceding everytime the programme restart
async function deleteSome(){
    try{
        let deletedUsers = UsersModel.find({}, {_num : 1}).deleteMany({ _num: { $gte: 101 }});
        let deletedExercises = ExercisesModel.find({}, {_num : 1}).deleteMany({ _num: { $gte: 101 }});
        let deleteSelcted = await Promise.all([
            deletedUsers, deletedExercises,
        ]);
        log(`Docs Deleted :
            `, "USERS : ",deleteSelcted[0],`
            `, "EXERCISES : ",deleteSelcted[1]
        );
    }catch(err){
        log(`Error Deleting Users Doc :`  , err);
    };
}

module.exports = {
    deleteSome
};