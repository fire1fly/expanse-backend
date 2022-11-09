import mongoose from 'mongoose';

const EventsSchema = mongoose.Schema({
  eventType: {
    type: Array,
    required: true
  },
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
  title: String,
  text: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

export default mongoose.model('Events', EventsSchema);