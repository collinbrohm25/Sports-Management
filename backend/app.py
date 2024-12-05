from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, text

app = Flask(__name__)
CORS(app)

@app.route('/api/sports', methods=['GET'])
def get_team_data():
    # Get team name and week from query parameters
    team_name = request.args.get('team', '')  # .lower() ensures case-insensitivity
    week = request.args.get('week')

    # If no team name is provided, return an error
    if not team_name:
        return jsonify({"error": "Team name is required"}), 400
    
    engine = create_engine('postgresql://postgres:@localhost:5432/sms')  # Change connection string
    with engine.connect() as conn:
    # Get the current week
        current_week_template = 'SELECT week_num from week order by week_num desc limit 1'
        current_week_result = conn.execute(text(current_week_template))
        current_week_row = current_week_result.fetchone()
        if current_week_row:
            current_week = current_week_row[0]
        print('current',week)

        if team_name:
            # Making sure the week is a valid input
            if week is not None and int(week) > 0 and int(week) <= int(current_week):
                if int(week) == int(current_week):
                    week_query = f'SELECT week_id FROM week WHERE CAST(week_num AS INTEGER) = {current_week}'
                    week_result = conn.execute(text(week_query))
                    week_row = week_result.fetchone()
                    week_id = week_row[0]
                    venue_id_query = f'SELECT venue_id FROM game where home_team_name = :team_name OR away_team_name = :team_name AND week_id = :week_id'
                    venue_id_result = conn.execute(text(venue_id_query))
                    venue_id_row = venue_id_result.fetchone()
                    venue_id = venue_id_row[0]
                    venue_query = f'SELECT * FROM venue where venue_id={venue_id}'
                    game_query = f'SELECT home_team_name, home_points, away_team_name, away_points FROM game where home_team_name = :team_name OR away_team_name = :team_name AND week_id = :week_id'
                    game_result = conn.execute(text(game_query), {f"team_name": team_name, "week_id": week_id})
                else:
                    print('n')
                    game_query = f'SELECT * FROM game where home_team_name = :team_name OR away_team_name = :team_name AND week_num = :week'
                    game_result = conn.execute(text(game_query), {f"team_name": team_name, "week_num": str(week)})

        # Assuming you have a valid database connection:
        # Here you need to connect to your database (PostgreSQL, MySQL, etc.)
        
                    
                venue_result = conn.execute(text(venue_query))
                venue = [dict(row) for row in venue_result.mappings()]
                data = [dict(row) for row in game_result.mappings()]
                print(venue)
                

        # Return the data as JSON
        return jsonify({"game": data, "venue": venue}), 200

if __name__ == '__main__':
    app.run(debug=True)
