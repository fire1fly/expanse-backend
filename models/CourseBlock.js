import mongoose from 'mongoose';

const CourseBlock = mongoose.Schema({
  title: String,
  duration: String,
}, {
  timestamps: true,
});

export default mongoose.model('CourseBlock', CourseBlock);