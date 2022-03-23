let {UsersModel} = require("../model/usersModel");
let {iteratableNumPropFunc} = require("../helpers/managing_DB_helpers");

let log = console.log;
let usersModel_create_post = async (req, res, next) =>{
    try{
        let num; // to better organize and manage my DB
        let data1 = await UsersModel.find({});
        num = iteratableNumPropFunc(data1);// this function contains "_num" that i want to create;
        let {username} = req.body;
        let data2 = await UsersModel.create({"username" : username, "_num" : num});
        let obj = {}
        obj.username = data2.username;
        obj._id = data2._id;
        res.json(obj);
    }catch(err){
        log(err);
        next(err)
    }
};

let usersModel_create_get = async(req, res, next) =>{
    try{
        let data = await UsersModel.find({}, {num : 0});
        res.json(data)
    }catch(err){
        log(err);
        next(err);
    }
};

module.exports = {
    usersModel_create_post,
    usersModel_create_get,
};