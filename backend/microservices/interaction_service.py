```python
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Interaction, AIAgent

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/ai_collaboration'
db.init_app(app)

class InteractionService(Resource):
    def get(self):
        interactions = Interaction.query.all()
        return jsonify([e.serialize() for e in interactions])

    def post(self):
        interaction_data = request.get_json()
        new_interaction = Interaction(
            ai_agent_id=interaction_data['ai_agent_id'],
            interaction_type=interaction_data['interaction_type'],
            interaction_data=interaction_data['interaction_data']
        )
        db.session.add(new_interaction)
        db.session.commit()
        return jsonify(new_interaction.serialize())

    def put(self, interaction_id):
        interaction_data = request.get_json()
        interaction = Interaction.query.filter_by(id=interaction_id).first()
        interaction.ai_agent_id = interaction_data['ai_agent_id']
        interaction.interaction_type = interaction_data['interaction_type']
        interaction.interaction_data = interaction_data['interaction_data']
        db.session.commit()
        return jsonify(interaction.serialize())

    def delete(self, interaction_id):
        interaction = Interaction.query.filter_by(id=interaction_id).first()
        if interaction:
            db.session.delete(interaction)
            db.session.commit()
            return 'Interaction deleted', 200
        else:
            return 'Interaction not found', 404

api.add_resource(InteractionService, '/api/interactions', '/api/interactions/<int:interaction_id>')

if __name__ == '__main__':
    app.run(debug=True)
```