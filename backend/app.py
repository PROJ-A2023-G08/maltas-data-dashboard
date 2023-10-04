from flask import Flask, request, jsonify
from flask_jwt import JWT, jwt_required
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# user authentication 
users = {
    'user': 'password'
}

# JWT configuration
def authenticate(username, password):
    if users.get(username) == password:
        return username

def identity(payload):
    user_id = payload['identity']
    return {"user_id": user_id}

jwt = JWT(app, authenticate, identity)

# protected endpoint
@app.route('/api/data', methods=['GET'])
@jwt_required()
def get_data():
    # Sample data from database
    data = {'key': 'value'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
