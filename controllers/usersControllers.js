let {UsersModel} = require("../model/usersAndExercisesModel");

let log = console.log;
let usersModel_create_post = async (req, res, next) =>{
    try{
        let {username} = req.body;
        let data = await UsersModel.create({"username" : username});
        let obj = {}
        obj.username = data.username;
        obj._id = data._id;
        res.json(obj);
    }catch(err){
        log(err);
        next(err)
    }
};

// Limite to 7, by deleting the exceding everytime
UsersModel.deleteMany({ username: { $gte: 7 }}, (err, data)=>err?log("Error Deleting Doc : ", err) : log("Doc Deleted : ", data));

module.exports = {
    usersModel_create_post,
};