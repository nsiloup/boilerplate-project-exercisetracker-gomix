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

        let unixNum = (date) =>{
            return Number(new Date(date));
        };

        // Sort the array ascending by date
        exercisesArr.sort((prev, curr)=>{
            return ( unixNum(prev.date) - unixNum(curr.date));
        })


        // "from", "to", "limit" PARAMETERS WILL GO HERE
        let slicedArr = exercisesArr;
        if(from && to){
            obj.from = from;
            obj.to = to;
            //FINDING THE INDEX at where to slice the returned array
            let fromInd = exercisesArr.findIndex(elt => unixNum(elt.date) >= unixNum(from));
            let copyArr = exercisesArr.slice();
            let toInd = copyArr.reverse().findIndex(elt => unixNum(elt.date) <= unixNum(to));
            
            let start;
            fromInd === -1 ? start = 0 : start = fromInd;// If no near "from" was found

            let end;
            toInd  === - 1 ? end = exercisesArr.length : end = exercisesArr.length - toInd; //if no near "toInd" was found
            log("fromInd",start, '\n',"toInd",end);
            slicedArr = exercisesArr.slice(start, end)
        };

        if(limit){
            slicedArr = slicedArr.slice(0, limit);
        }

        obj.count = count;
        obj.log = slicedArr;

        res.json(obj);
        
    }catch(err){
        log(err);
        next(err);
    }
};

module.exports = {
    logsModel_create_logs,
};