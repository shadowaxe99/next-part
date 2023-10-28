```python
from flask import Flask, request
from flask_restful import Resource, Api
from models import AIAgent, Task

app = Flask(__name__)
api = Api(app)

class TaskDelegationService(Resource):
    def post(self):
        data = request.get_json()
        task_id = data['task_id']
        ai_agent_id = data['ai_agent_id']

        task = Task.query.get(task_id)
        ai_agent = AIAgent.query.get(ai_agent_id)

        if not task or not ai_agent:
            return {'message': 'Task or AI Agent not found'}, 404

        task.ai_agent_id = ai_agent.id
        task.save()

        return {'message': 'Task assigned successfully'}, 200

    def put(self):
        data = request.get_json()
        task_id = data['task_id']

        task = Task.query.get(task_id)

        if not task:
            return {'message': 'Task not found'}, 404

        task.status = 'completed'
        task.save()

        return {'message': 'Task marked as completed'}, 200

api.add_resource(TaskDelegationService, '/task_delegation')

if __name__ == '__main__':
    app.run(debug=True)
```