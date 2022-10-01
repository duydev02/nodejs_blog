const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted(),
            Course.countDocuments(),
        ])
            .then(([courses, deletedCount, coursesCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    coursesCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Promise.all([Course.findDeleted({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/trash-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
