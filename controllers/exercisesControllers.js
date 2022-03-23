let {ExercisesModel} = require("../model/exercisesModel");
let {UsersModel} = require("../model/usersModel");

let {iteratableNumPropFunc} = require("../helpers/managing_DB_helpers");

let log = console.log;

let exercisesModel_create_post = async (req, res, next) =>{
    try{    
        let {description, duration, date} = req.body;
        let {_id} = req.params;
        let providedDate = date;
        let  dateToRutrun;
        if(!providedDate){
            dateToRutrun = new Date().toDateString()
        }else{
            let d = new Date(providedDate);
            dateToRutrun = d.toDateString();
        };


        let o = await UsersModel.findById(_id, {_id : 1, username :1}).lean(); // The object for "users" items
        let username = o.username

        let obj = {};// the object for the "Exercises items"
        obj.description = description;
        obj.duration = duration;
        obj.date = dateToRutrun;
        obj.username = username;

        // creating a iteratable _num entry for better controlling the documents
        let dataArr = await ExercisesModel.find({}).lean();
        let num = iteratableNumPropFunc(dataArr);// this function contains "_num" that i want to create;
        obj._num = num;

        let savedObj = await ExercisesModel.create(obj);

        let retObj = {};
        retObj._id = _id;
        retObj.username = savedObj.username;
        retObj.description = savedObj.description;
        retObj.duration = savedObj.duration;
        retObj.date = savedObj.date;

        res.json(retObj);


    }catch(err){
        log(err);
        next(err);
    };
};

module.exports = {
    exercisesModel_create_post,
};
