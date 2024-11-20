"""Module for transforming data into its DTO"""
from datetime import datetime

from dtos.SportRadarDTO import WeekDTO
from models.models import Week
from schemas.schema import WeekSchema

database_entry = tuple[str, str, str, str, str, datetime, bool, str,
                       str, str, str, str, str, str, str, str,
                       str, int, str, str, str, int, int, int]
class Transformer:
    def __init__(self):
        pass

    def transform_week(self, week_data: Week) -> WeekDTO:
        """Function to add the incoming data into a data structure which is
        to be inserted. 
        
        Args:
            week_data: The data for the current week of NFL.
            
        Returns:
            request_objects: A datastructure of type WeekDTO containing the values
            to be inserted into PostGres.
        """
        request_objects = WeekDTO 
        request_objects.week_id = week_data.week_id
        request_objects.year = week_data.year
        request_objects.week_num = week_data.week.week_num
        request_objects.game_id = week_data.week.games[0].game_id
        request_objects.status = week_data.week.games[0].status
        request_objects.scheduled = week_data.week.games[0].scheduled
        request_objects.conference_game = week_data.week.games[0].conference_game
        request_objects.venue_id = week_data.week.games[0].venue.venue_id
        request_objects.venue_name = week_data.week.games[0].venue.name
        request_objects.venue_city = week_data.week.games[0].venue.city
        request_objects.venue_state = week_data.week.games[0].venue.state
        request_objects.venue_country = week_data.week.games[0].venue.country
        request_objects.surface = week_data.week.games[0].venue.surface
        request_objects.roof_type = week_data.week.games[0].venue.roof_type
        request_objects.home_team_id = week_data.week.games[0].home.home_team_id
        request_objects.home_team_name = week_data.week.games[0].home.home_team_name
        request_objects.home_team_abbreviation = week_data.week.games[0].home.home_team_abbreviation
        request_objects.home_team_games_played = week_data.week.games[0].home.home_team_games_played
        request_objects.home_points = week_data.week.games[0].scoring.home_points
        request_objects.away_points = week_data.week.games[0].scoring.away_points
    
        return request_objects  
        