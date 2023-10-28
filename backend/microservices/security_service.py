```python
from cryptography.fernet import Fernet
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Generate a key for encryption and decryption
key = Fernet.generate_key()
cipher_suite = Fernet(key)

# List of AI agents and users
aiAgents = []
users = []

@app.route('/encryptCommunication', methods=['POST'])
def encryptCommunication():
    message = request.json['message']
    encrypted_message = cipher_suite.encrypt(message.encode())
    return jsonify({'encrypted_message': encrypted_message.decode()}), 200

@app.route('/decryptCommunication', methods=['POST'])
def decryptCommunication():
    encrypted_message = request.json['encrypted_message']
    decrypted_message = cipher_suite.decrypt(encrypted_message.encode())
    return jsonify({'decrypted_message': decrypted_message.decode()}), 200

@app.route('/controlAccess', methods=['POST'])
def controlAccess():
    agent_id = request.json['agent_id']
    user_id = request.json['user_id']
    
    if agent_id not in aiAgents or user_id not in users:
        return jsonify({'message': 'Access Denied'}), 403

    return jsonify({'message': 'Access Granted'}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
```