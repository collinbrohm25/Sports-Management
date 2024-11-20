"""Module for containing schema for incoming data from SportRadar."""

import marshmallow.fields as marsh
import marshmallow 
from marshmallow import EXCLUDE

from models.models import Week, InnerWeek, Games, Home, Away, Scoring, Venue


class ScoringSchema(marshmallow.Schema):
    home_points = marsh.Int()
    away_points = marsh.Int()

    class Meta:
        ordered=True
        unknown = EXCLUDE

    @marshmallow.post_load()
    def make_scoring(self, data, **_) -> Scoring:
        return Scoring(**data)
    
class AwaySchema(marshmallow.Schema):
    away_team_id = marsh.Str(data_key='id')
    away_team_name = marsh.Str(data_key='name')
    away_team_abbreviation = marsh.Str(data_key='alias')
    away_team_games_played = marsh.Int(data_key='game_number')

    class Meta:
        ordered=True
        unknown = EXCLUDE

    @marshmallow.post_load()
    def make_home_team(self, data, **_) -> Away:
        return Away(**data)
    
class HomeSchema(marshmallow.Schema):
    home_team_id = marsh.Str(data_key='id')
    home_team_name = marsh.Str(data_key='name')
    home_team_abbreviation = marsh.Str(data_key='alias')
    home_team_games_played = marsh.Int(data_key='game_number')

    class Meta:
        ordered=True
        unknown = EXCLUDE

    @marshmallow.post_load()
    def make_away_team(self, data, **_) -> Home:
        return Home(**data)

class VenueSchema(marshmallow.Schema):
    venue_id = marsh.Str(data_key='id')
    name = marsh.Str()
    city = marsh.Str()
    state = marsh.Str()
    country = marsh.Str()
    surface = marsh.Str()
    roof_type = marsh.Str()

    class Meta:
        ordered=True
        unknown = EXCLUDE

    @marshmallow.post_load()
    def make_venue(self, data, **_) -> Venue:
        return Venue(**data)

class GamesSchema(marshmallow.Schema):
    game_id = marsh.Str(data_key='id')
    status = marsh.Str()
    scheduled = marsh.Str()
    conference_game = marsh.Bool()
    venue = marsh.Nested(VenueSchema)
    home = marsh.Nested(HomeSchema)
    away = marsh.Nested(AwaySchema)
    scoring = marsh.Nested(ScoringSchema)

    class Meta:
        ordered=True
        unknown = EXCLUDE

    @marshmallow.post_load()
    def make_games(self, data, **_) -> Games:
        return Games(**data)


class InnerWeekSchema(marshmallow.Schema):
    week_num = marsh.Int(data_key='title')
    games = marsh.List(marsh.Nested(GamesSchema))

    class Meta:
        ordered=True
        unknown = EXCLUDE

    @marshmallow.post_load()
    def make_inner_week(self, data, **_) -> InnerWeek:
        return InnerWeek(**data)

class WeekSchema(marshmallow.Schema):
    week_id = marsh.Str(data_key='id')
    year = marsh.Int()
    week = marsh.Nested(InnerWeekSchema)

    class Meta:
        ordered=True
        unknown = EXCLUDE

    @marshmallow.post_load()
    def make_week(self, data, **_) -> Week:
        return Week(**data)
