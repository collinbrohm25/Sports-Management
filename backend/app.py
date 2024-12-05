from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, text

app = Flask(__name__)
CORS(app)

@app.route('/api/sports', methods=['GET'])
def get_team_data():
    print(request.args)
    # Get team name and week from query parameters
    team_name = request.args.get('team', '').lower()  # .lower() ensures case-insensitivity
    week = request.args.get('week')

    # If no team name is provided, return an error
    if not team_name:
        return jsonify({"error": "Team name is required"}), 400

    # Start building the SQL query
    query = "SELECT * FROM game WHERE LOWER(team_name) = home_team_name OR away_team_name"
    params = {"team_name": f"%{team_name}%"}

    # If a week is provided, add it to the query
    if week:
        query += " AND week = :week"
        params["week"] = week

    # Assuming you have a valid database connection:
    # Here you need to connect to your database (PostgreSQL, MySQL, etc.)
    engine = create_engine('postgresql://postgres:@localhost:5432/sms')  # Change connection string
    with engine.connect() as conn:
        result = conn.execute(text(query), params)
        data = result.fetchall()  # Fetch the result

    # Return the data as JSON
    return jsonify({"data": data}), 200

if __name__ == '__main__':
    app.run(debug=True)
