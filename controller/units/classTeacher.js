const ClassTeacher = require("../../model/units/classTeachers");
const catchAsync = require("../../utils/catchAsync.js");

const getAllClassTeachers = catchAsync(async (req, res, next) => {
    const classTeachers = await ClassTeacher.find().populate({
        path: 'classID'
    }).populate({
        path: 'teacherID'
    });
    if (!classTeachers) return res.status(204).json({ status: 'success', data: classTeachers });
    res.status(200).json({ status: 'success', result: classTeachers.length, data: classTeachers });
});

const addAclassTeacher = catchAsync(async (req, res, next) => {
    const { classID, teacherID } = req.body;
    const duplicate = await ClassTeacher.findOne({
        isActive: { $ne: ["true"] }
    }).exec();
    if (duplicate)
        return res
            .status(409)
            .json({
                message:
                    "Kindly deactive the active account then trial again!",
            });
    const result = await Unit.insertOne({
        classID: classID,
        teacherID: teacherID
    });
    res.status(201).json({
        status: 'success',
        result: lenght.result,
        data: result
    });
});
const getClassteacherById = catchAsync(async (req, res, next) => {
    const _id = req.params.id
    if (!_id) {
        return res.status(400).json({ staus: 'failed', message: "The id used did not match any item from our database" });
    }
    const classTeacher = await ClassTeacher.findOne({ _id: _id }).exec();
    if (!classTeacher) {
        return res
            .status(204)
            .json({
                status: 'failed',
                message: `Sorry, we could retrive data with provided ID ${req.body._id}.`
            });
    }
    res.status(200).json({
        status: 'success',
        result: classTeacher.length,
        data: classTeacher
    });
});
const editClassTeacher = catchAsync(async (req, res, next) => {
    let { classID, teacherID, _id } = req.body
    if (!_id)
        return res.status(400).json({ status: 'failed', message: "Subject ID required" });
    const classTeacher = await ClassTeacher.findOne({ _id: _id }).exec();
    if (!classTeacher) {
        return res
            .status(204)
            .json({ status: 'failed', message: `The supplied Id did not matches any unit ${_id}.`, data: unit });
    }
    if (req.body?.classID) classTeacher.classID = classID;
    if (req.body?.teacherID) classTeacher.teacherID = teacherID;
    const query = { classID, teacherID }
    const result = await ClassTeacher.updateOne({ _id: _id }, query, { upsert: true });
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    });
});
const deactivate = catchAsync(async (req, res, next) => {});

const archive = catchAsync(async (req, res, next) => {});


module.exports = {
    getAllClassTeachers,
    addAclassTeacher,
    getClassteacherById,
    editClassTeacher,
    deactivate,
    archive
};
