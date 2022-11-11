import mongoose from 'mongoose';

const CoursesSchema = mongoose.Schema({
  departments: [],
  title: String,
  description: String,
  courseBlocks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courseBlock'
    }
  ]
}, {
  timestamps: true,
});

export default mongoose.model('Course', CoursesSchema);