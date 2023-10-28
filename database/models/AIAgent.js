```javascript
const mongoose = require('mongoose');

const AIAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  capabilities: {
    type: [String],
    required: true
  },
  workload: {
    type: Number,
    default: 0
  },
  interactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interaction'
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  feedbacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback'
  }]
});

const AIAgent = mongoose.model('AIAgent', AIAgentSchema);

module.exports = AIAgent;
```