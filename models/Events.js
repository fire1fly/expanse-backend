import mongoose from 'mongoose';

const EventsSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  departments: {
    type: Array,
    default: undefined
  },
  time: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

export default mongoose.model('Events', EventsSchema);