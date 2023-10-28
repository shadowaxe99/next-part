```python
from flask import Flask, request
from database.models import AIAgent, Task, Interaction, User

app = Flask(__name__)

@app.route('/feedback', methods=['POST'])
def receive_feedback():
    feedback_data = request.get_json()
    agent_id = feedback_data['agent_id']
    task_id = feedback_data['task_id']
    feedback = feedback_data['feedback']

    agent = AIAgent.objects.get(id=agent_id)
    task = Task.objects.get(id=task_id)

    agent.feedback.append({'task': task, 'feedback': feedback})
    agent.save()

    return {'message': 'Feedback received successfully'}, 200

if __name__ == '__main__':
    app.run(port=5004, debug=True)
```