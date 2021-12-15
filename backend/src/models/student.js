// import { Schema as _Schema } from 'mongoose';
// const Schema = _Schema;

// let studentSchema = new Schema({
//   name: {
//     type: String
//   },
//   email: {
//     type: String
//   },
//   phone: {
//     type: Number
//   },
// }, {
//   collection: 'students'
// })

// module.exports = mongoose.model('Student', studentSchema)

// Create a Schema
import mongooseModules from 'mongoose';
const { Schema, model } = mongooseModules;

export const studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
}, {
  collection: 'students'
});

export const StudentModel = model('Student', studentSchema)
