const School = require("../../model/school/school");
const catchAsync = require("../../utils/catchAsync.js");

const getAllSchool = catchAsync(async (req, res, next) => {
    const result = await School.find()
    if (!result) {
        return res.status(204).json({
            status: 'empty',
            message: 'No data was found'
        })
    }
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const getSchoolById = catchAsync(async (req, res, next) => {
    const _id = req.params.id
    console.log(_id)
    const result = await School.findOne({
        _id: _id
    })
    if (!result) {
        return res.status(204).json({
            status: 'empty',
            result: result.length,
            data: result
        })
    }
    return res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const registerSchool = catchAsync(async (req, res, next) => {
    let {
        schoolName,
        schoolCode,
        schoolMotto,
        schoolLogo,
        schoolID,
        schoolCounty,
        schoolPrincipal,
        schoolDeputy,
        schoolSeniorTeacher
    } = req.body
    const result = await School.create({
        schoolName: schoolName,
        schoolCode: schoolCode,
        schoolMotto: schoolMotto,
        schoolLogo: schoolLogo,
        schoolID: schoolID,
        schoolCounty: schoolCounty,
        schoolPrincipal: schoolPrincipal,
        schoolDeputy: schoolDeputy,
        schoolSeniorTeacher: schoolSeniorTeacher
    })
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const updateSchool = catchAsync(async (req, res, next) => {
    let {
        schoolName,
        schoolMotto,
        schoolLogo,
        schoolID,
        schoolCounty,
        schoolPrincipal,
        schoolDeputy,
        schoolSeniorTeacher,
        _id
    } = req.body
    let id = _id
    if (!id) {
        return res.status(400).json({
            status: 'faied',
            message: 'school id must have sth!'
        })
    }
    const findSchool = await School.findById({
        _id: id
    })
    if (!req.body?.schoolName) schoolName = findSchool.schoolName
    if (!req.body?.schoolMotto) schoolMotto = findSchool.schoolMotto
    if (!req.body?.schoolLogo) schoolLogo = findSchool.schoolLogo
    if (!req.body?.schoolID) schoolID = findSchool.schoolID
    if (!req.body?.schoolCounty) schoolCounty = findSchool.schoolCounty
    if (!req.body?.schoolPrincipal) schoolPrincipal = findSchool.schoolPrincipal
    if (!req.body?.schoolSeniorTeacher) schoolSeniorTeacher = findSchool.schoolSeniorTeacher
    let newQuery = {
        schoolName: schoolName,
        schoolMotto: schoolMotto,
        schoolLogo: schoolLogo,
        schoolID: schoolID,
        schoolCounty: schoolCounty,
        schoolPrincipal: schoolPrincipal,
        schoolDeputy: schoolDeputy,
        schoolSeniorTeacher: schoolSeniorTeacher
    }
    const result = await School.updateOne(
        { _id: id },
        newQuery,
        { upsert: true }
    )
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const isActive = catchAsync(async (req, res, next) => {

})

const isArchived = catchAsync(async (req, res, next) => {

})
module.exports =
{
    getAllSchool,
    getSchoolById,
    updateSchool,
    registerSchool,
    isActive,
    isArchived
}