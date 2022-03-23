let iteratableNumPropFunc = (arrFromDbQuery) =>{
    let iteratedNum;
    if(arrFromDbQuery.length === 0 ){
        iteratedNum = 1;
    }else if(arrFromDbQuery.length === 1){
        iteratedNum = 2
    }else if(arrFromDbQuery.length >= 2){
        let shortUrlNum = arrFromDbQuery.reduce((previous, current)=>{
            return (previous._num > current._num ) ? previous: current;
        });
        shortUrlNum = shortUrlNum._num + 1;
        iteratedNum = shortUrlNum;
    };
    return iteratedNum;
};

module.exports = {
    iteratableNumPropFunc,
};