import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidator } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as EventsController from './controllers/EventsController.js';
import * as CoursesController from './controllers/CoursesController.js';

mongoose
  .connect('mongodb+srv://admin:BRxOI2CGQpXM8qqf@cluster0.thq2mgf.mongodb.net/db?retryWrites=true&w=majority')
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log("DB error: ", err));

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hi, it is response!');
});

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidator, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/eventsByDay', checkAuth, EventsController.eventsByDay);
app.get('/notifications', checkAuth, EventsController.notifications);
app.get('/courses', checkAuth, CoursesController.courses);

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server is runing!');
});