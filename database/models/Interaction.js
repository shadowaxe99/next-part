const mongoose = require('mongoose');
const { Schema } = mongoose;

const InteractionSchema = new Schema({
  aiAgent1: {
    type: Schema.Types.ObjectId,
    ref: 'AIAgent',
    required: true
  },
  aiAgent2: {
    type: Schema.Types.ObjectId,
    ref: 'AIAgent',
    required: true
  },
  interactionType: {
    type: String,
    enum: ['text', 'data', 'file'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Interaction', InteractionSchema);