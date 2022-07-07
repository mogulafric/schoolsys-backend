const Role = require('../model/Role');

const getAllRoles = async (req, res) => {
    const roles = await Role.find();
    if (!roles) return res.status(204).json({ 'message': 'No Roles found.' });
    res.json(roles);
}

const createNewRole = async (req, res) => {
    const {rolename,rolecode} = req.body;
    if (!rolename || !rolecode) {
        return res.status(400).json({ 'message': 'Role name and role code are required' });
    }

  // check for duplicate roles in the db
  const duplicate = await Role.findOne({ rolename: rolename, rolecode:rolecode }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict 
    
    try {
        const result = await Role.create({
            rolename: req.body.rolename,
            rolecode: req.body.rolecode
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateRole = async (req, res) => {
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const role = await Role.find({ _id: req.body._id }).exec();
    if (!role) {
        return res.status(204).json({ "message": `No role matches ID ${req.body._id}.` });
    }
    if (req.body?.rolename) role.rolename = req.body.rolename;
    if (req.body?.rolecode) role.rolecode = req.body.rolecode;
    const result = await Role.create({
        rolename: req.body.rolename,
        rolecode: req.body.rolecode
    });
    res.json(result);
}

const deleteRole = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 'message': 'Role ID required.' });

    const role = await Role.findOne({ _id: req.body.id }).exec();
    if (!role) {
        return res.status(204).json({ "message": `No role matches ID ${req.body.id}.` });
    }
    const result = await Role.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getRole = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Role ID required.' });

    const role = await Role.findOne({ _id: req.params.id }).exec();
    if (!role) {
        return res.status(204).json({ "message": `No role matches ID ${req.params.id}.` });
    }
    res.json(role);
}

module.exports = {
    getAllRoles,
    createNewRole,
    updateRole,
    deleteRole,
    getRole
}