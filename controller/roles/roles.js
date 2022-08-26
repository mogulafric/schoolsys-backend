const Role = require('../../model/roles/roles');
const catchAsync = require('../../utils/catchAsync');
const getAllRoles = catchAsync(async (req, res, next) => {
    const roles = await Role.find();
    if (!roles) return res.status(204).json({ 'message': 'No Roles found.' });
    res.status(200).json({
        status: 'success',
        result: roles.length,
        data: roles
    });
})
const createNewRole = catchAsync(async (req, res, next) => {
    const { roleName, roleCode } = req.body;
    const result = await Role.create({
        roleName: roleName,
        roleCode: roleCode
    });
    res.status(201).json({
        status: 'success',
        result: result.length,
        data: result
    });
})

const updateRole = catchAsync(async (req, res, next) => {
    let {_id, roleName,roleCode}= req.body
    if (!_id){
        return res.status(400).json({
            status: 'failed',
            message: 'ID parameter is required.'
        });
    }
    const role = await Role.find({
        _id:_id
    }).exec();
    if (!role) {
        return res.status(204).json({
            status: 'failed',
            message: `No role matches ID`
        });
    }
    if (req.body?.roleName) role.roleName = req.body.roleName;
    if (req.body?.roleCode) role.roleCode = req.body.roleCode;
    const result = await Role.updateOne({_id:_id},{
        roleName: roleName,
        roleCode: roleCode
    }, {upsert:true});
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    });
})
const deleteRole = catchAsync(async (req, res, next) => {
    if (!req?.body?.id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Role ID required.'
        })
    };
    const role = await Role.findOne({
        _id: req.body.id
    }).exec();
    if (!role) {
        return res.status(204).json({
            status: 'empty',
            message: `No role matches ID ${req.body.id}.`
        });
    }
    const result = await Role.deleteOne();
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    });
})
const getRole = catchAsync(async (req, res, next) => {
    if (!req?.params?.id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Role ID required.'
        })
    };
    const role = await Role.findOne({ 
        _id: req.params.id 
    }).exec();
    if (!role) {
        return res.status(204).json({ 
            status:'empty',
            message: `No role matches ID ${req.params.id}.` 
        });
    }
    res.status(200).json({
        status:'success',
        result:role.length,
        data:role
    });
})
module.exports = {
    getAllRoles,
    createNewRole,
    updateRole,
    deleteRole,
    getRole
}