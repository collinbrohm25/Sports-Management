"""Module containing data that are to be inserted into a database."""

from dataclasses import dataclass
from datetime import datetime

# TODO: Refactor at a later point with seperate tables. For now they will all go 
# into one. 
@dataclass(frozen=True)
class WeekDTO:
    year: str
    week_id: str
    week_num: str 
    game_id: str
    status: str
    scheduled: datetime
    conference_game: bool
    venue_id: str
    venue_name: str
    venue_city: str
    venue_state: str
    venue_country: str
    surface: str
    roof_type: str
    home_team_id: str
    home_team_name: str
    home_team_abbreviation: str
    home_team_games_played: int
    away_team_id: str
    away_team_name: str
    away_team_abbreviation: str
    away_team_games_played: int
    home_points: int
    away_points: int



