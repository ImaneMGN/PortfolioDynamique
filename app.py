from flask import Flask, render_template, request, jsonify
from bson.objectid import ObjectId
from config import users_collection

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data received"}), 400

    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    education = data.get("education", [])
    skills = data.get("skills", [])
    projects = data.get("projects", [])

    if not (full_name and email and phone):
        return jsonify({"error": "Missing required fields"}), 400

    user_data = {
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "education": education,
        "skills": skills,
        "projects": projects
    }

    result = users_collection.insert_one(user_data)
    return jsonify({"user_id": str(result.inserted_id)})

@app.route('/portfolio/<user_id>')
def portfolio(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return "User not found", 404
    return render_template('portfolio.html', user=user)

if __name__ == '__main__':
    app.run(debug=True)
