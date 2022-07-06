const { CommandFailedEvent } = require('mongodb');
const User = require('../../model/auth/users.js');
const catchAsync = require('../../utils/catchAsync')

class APIFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filter(){
    const queryObj = {...this.queryString}
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el])
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);
    this.query.find(JSON.parse(queryStr))
    return this;
    }
    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else {
            this.query=this.query.sort();
        }
        return this
    }
    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query = query.select('userName');
        }
        return this;
    }
    pagination(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page -1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        if(req.query.page){
            const numUsers = this.query.countDocuments();
            if(skip >= numUsers) throw new Error('This page doess not exist');
        }
        return this;
    }
}
const getAllUsers = catchAsync(async (req, res, next) => {
 
    const features = new APIFeatures(User.find(),req.query)
    .filter().sort().limitFields().pagination();
    res.json({
        status:'success',
        result:features.length,
        data:features
    });
})
const sigin = (req, res, next)=>{

}
const createNewUser = catchAsync(async(req, res, next)=>{
    const user = await User.create(req.body)
    if(!user) res.json({status:failed,message:"Your request failed!"})
    res.json({
        status:'success',
        data:user
    })
})
const updateNewUser = (req, res, next)=>{   
}
const getAllRegisteredUsers = (req, res, next)=>{   
}
const getUserById = (req, res, next)=>{   
}
module.exports = {
    getAllUsers,
    sigin,
    createNewUser,
    updateNewUser,
    getAllRegisteredUsers,
    getUserById
}

