import { Router } from 'express';
const studentRoute = Router();
import mongooseModules from 'mongoose';
const { model } = mongooseModules;

// Student model
import { StudentModel } from '../models/student.js'

studentRoute.route('/').get((req, res) => {
  StudentModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

studentRoute.route('/create-student').post((req, res, next) => {
  StudentModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

studentRoute.route('/edit-student/:id').get((req, res) => {
  StudentModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update student
studentRoute.route('/update-student/:id').post((req, res, next) => {
  StudentModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})

// Delete student
studentRoute.route('/delete-student/:id').delete((req, res, next) => {
  StudentModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export { studentRoute }