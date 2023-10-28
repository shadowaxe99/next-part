```python
from flask import Flask, request
from database.models import Interaction, AIAgent, Task, User
from database.index import db_session

app = Flask(__name__)

@app.route('/search', methods=['POST'])
def search_interaction():
    search_query = request.json['query']
    interactions = Interaction.query.filter(Interaction.content.contains(search_query)).all()
    return {'interactions': [interaction.serialize for interaction in interactions]}

@app.route('/filter', methods=['POST'])
def filter_interaction():
    filter_params = request.json
    interactions = Interaction.query.filter_by(**filter_params).all()
    return {'interactions': [interaction.serialize for interaction in interactions]}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```