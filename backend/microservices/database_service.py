```python
from pymongo import MongoClient
from bson.objectid import ObjectId

# Database connection
client = MongoClient('mongodb://localhost:27017/')
db = client['ai_collaboration_hub']

# Collections
aiAgents = db['aiAgents']
tasks = db['tasks']
interactions = db['interactions']
users = db['users']

# Schemas
AIAgentSchema = {
    '_id': ObjectId,
    'name': str,
    'capabilities': list,
    'workload': int
}

TaskSchema = {
    '_id': ObjectId,
    'name': str,
    'assigned_to': ObjectId,
    'status': str,
    'sub_tasks': list
}

InteractionSchema = {
    '_id': ObjectId,
    'ai_agent_1': ObjectId,
    'ai_agent_2': ObjectId,
    'interaction_type': str,
    'data': dict
}

UserSchema = {
    '_id': ObjectId,
    'username': str,
    'password': str,
    'role': str
}

# Functions
def insert_document(collection, document):
    return collection.insert_one(document).inserted_id

def find_document(collection, query):
    return collection.find_one(query)

def update_document(collection, query, new_values):
    collection.update_one(query, {'$set': new_values})

def delete_document(collection, query):
    collection.delete_one(query)
```