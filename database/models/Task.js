```javascript
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AIAgent'
    }],
    completed: {
        type: Boolean,
        default: false
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    feedback: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Task', TaskSchema);
```