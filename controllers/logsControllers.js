let {ExercisesModel} = require("../model/exercisesModel");
let {UsersModel} = require("../model/usersModel");
let log = console.log;

let logsModel_create_logs = async(req, res, next)=>{
    try{
        let {_id} = req.params;
        let {from, to, limit} = req.query;
        let o = await UsersModel.findById(_id, {username :1}).lean(); // The object for "users" items
        let username = o.username;

    let exercisesArr = await ExercisesModel.find({globalUserId : _id}, {_id:0, _num : 0, globalUserId : 0, username : 0, __v : 0, /*description : 1, duration : 1, date : 1*/}).lean();
    log("exercisesArr : ", exercisesArr)
        let count = exercisesArr.length;

        let obj = {};
        obj._id = _id;
        obj.username = username;
        obj.count = count;
        obj.log = exercisesArr;

        res.json(obj);
        
    }catch(err){
        log(err);
        next(err);
    }
};

module.exports = {
    logsModel_create_logs,
};