import express from 'express';
import cors from 'cors';
import mongooseModules from 'mongoose';
const { connect } = mongooseModules;
import { db as database } from './database.js';
import createError from 'http-errors'

// Connect mongoDB
import dotenv from 'dotenv'
dotenv.config() // Load .env file
const mongoURI = process.env.MONGO_URI;
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log('Error', err);
  console.log(`Connected to MongoDB`);
});

/* Cach 2: Import from localhost (file database.js)
mongoose.Promise = global.Promise;
mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected")
},
  error => {
    console.log("Database could't be connected to: " + error)
  }
)
*/

import { studentRoute as studentAPI } from '../backend/src/routes/student.route.js'
const app = express();

app.use(cors());

/**  Use body-parser to Parse POST Requests */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API
app.use('/api', studentAPI)

// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
