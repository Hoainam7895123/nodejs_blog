const Course = require('../models/Course')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {

            const isValidtype = ['ase', 'desc'].includes(req.query.type)

            courseQuery = courseQuery.sort({
                [req.query.column]: isValidtype ? req.query.type : 'desc'
            })
        }

        courseQuery            
            .then(courses => res.render('me/stored-courses', {
                courses : multipleMongooseToObject(courses)
            }))
            .catch(error => next(error))
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        console.log('Starting trashCourses...');
    
        Course.findDeleted()
            .then(courses => {
                console.log('Courses found:', courses); // Log dữ liệu
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(err => {
                console.error('Error finding deleted courses:', err);
                next(err);
            });
    }

}

module.exports = new MeController();
