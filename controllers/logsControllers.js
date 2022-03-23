let {ExercisesModel} = require("../model/exercisesModel");
let {LogsModel} = require("../model/logsModel");
let {UsersModel} = require("../model/usersModel");
let {iteratableNumPropFunc} = require("../helpers/managing_DB_helpers");
let log = console.log;

let logsModel_create_get = async(req, res, next)=>{
    try{
        let {_id} = req.params;
        let o = await UsersModel.findById(_id, {username :1}).lean(); // The object for "users" items
        let username = o.username;

        let exercisesArr =await ExercisesModel.aggregate([
            {
                $match : {username : username}
            },
            {
                $group : {
                    _id : "$username",
                    description : {"$first" : "$description"},
                    duration : {"$first" : "$duration"},
                    date : {"$first" : "$date"}
                },
            },
            {
                $project : {
                    _id : 0,
                    description : 1,
                    duration : 1,
                    date : 1
                }
            }
    ]);
        let count = exercisesArr.length;

        let obj = {};
        obj.username = username;
        obj.count = count;
        obj.log = exercisesArr;
        let objToSave = {...obj};//only a part of object to save

        //IIFE function for saving only a part of to the object to DB, to avoid overriting the _id field
        (async()=>{
            let dataArr = await ExercisesModel.find({}).lean();
            let num = iteratableNumPropFunc(dataArr);// this function contains "_num" that i want to create;
            objToSave._num = num;
            let savedObj = await LogsModel.create(objToSave);
        })();
        obj._id = _id;

        //return the object with the _id;
        res.json(obj);
        
    }catch(err){
        log(err);
        next(err);
    }
};


module.exports = {
    logsModel_create_get,
};