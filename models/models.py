"""Module containing models for incoming data from SportRadar."""

from dataclasses import dataclass
from datetime import datetime

@dataclass(frozen=True)
class Scoring:
    home_points: int
    away_points: int

@dataclass(frozen=True)
class Away:
    away_team_id: str
    away_team_name: str
    away_team_abbreviation: str
    away_team_games_played: int

@dataclass(frozen=True)
class Home:
    home_team_id: str
    home_team_name: str
    home_team_abbreviation: str
    home_team_games_played: int

@dataclass(frozen=True)
class Venue:
    venue_id: str
    name: str
    city: str
    state: str
    country: str
    surface: str
    roof_type: str

@dataclass(frozen=True)
class Games:
    """Main dataclass."""
    game_id: str
    status: str
    scheduled: datetime
    conference_game: bool
    venue: Venue
    home: Home
    away: Away
    scoring: Scoring

@dataclass(frozen=True)
class InnerWeek:
    week_num: str  # inside week title
    games: list[Games]

@dataclass(frozen=True)
class Week:
    week_id: str
    year: str
    week: InnerWeek
