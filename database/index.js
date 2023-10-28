```javascript
const mongoose = require('mongoose');

const AIAgentSchema = require('./models/AIAgent');
const TaskSchema = require('./models/Task');
const InteractionSchema = require('./models/Interaction');
const UserSchema = require('./models/User');

mongoose.connect('mongodb://localhost/ai_collaboration_hub', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to the database successfully!");
});

const AIAgent = mongoose.model('AIAgent', AIAgentSchema);
const Task = mongoose.model('Task', TaskSchema);
const Interaction = mongoose.model('Interaction', InteractionSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
  AIAgent,
  Task,
  Interaction,
  User
};
```