let {UsersModel} = require("../model/usersAndExercisesModel");

let log = console.log;
let usersModel_create_post = async (req, res, next) =>{
    try{
        let num; // to better organize and manage my DB
        let data1 = await UsersModel.find({});
        if(data1.length === 0 ){
            num = 1;
        }else if(data1.length === 1){
            num = 2
        }else if(data1.length >= 2){
            let shortUrlNum = data1.reduce((previous, current)=>{
                return (previous.num > current.num ) ? previous: current;
            });
            shortUrlNum = shortUrlNum.num + 1;
            num = shortUrlNum;
        };
        let {username} = req.body;
        let data2 = await UsersModel.create({"username" : username, "num" : num});
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
        //log("type of data is : ", typeof data)
        res.json(data)
    }catch(err){
        log(err);
        next(err);
    }
};

//Limit to 25 users, by deleting the exceding everytime
(async ()=>{
    try{
        let arr = await UsersModel.find({}, {num : 1});
        if(arr.length >= 25){
            let data = UsersModel.deleteMany({ num: { $gte: 25 }});
            log("document Number > 25, so Doc Deleted : ", data);
        }else{
            log("Doc < 25, so nothing deleted!")
        };
    }catch(err){
        log("Error Deleting Doc : ", err)
    };
})()
//UsersModel.deleteMany({ username: { $gte: 7 }}, (err, data)=>err?log("Error Deleting Doc : ", err) : log("Doc Deleted : ", data));

module.exports = {
    usersModel_create_post,
    usersModel_create_get,
};