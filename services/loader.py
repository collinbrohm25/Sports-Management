"""Module to load data into a datastore."""
import requests

from schemas.schema import WeekSchema
from models.models import Week

OK = 200

class Loader:
    def __init__(self):
        self.week_url = 'https://api.sportradar.com/nfl/official/trial/v7/en/games/current_week/schedule.json?api_key='
        self.api_key = 'u1eEkxdkg5O4xNdtBsfGAg2ihO9fBFm0cY9FnmKQ'
        
    def load_current_week(self) -> Week:
        schema = WeekSchema()
        headers = {"accept": "application/json"}
        url = f'{self.week_url}{self.api_key}'
        response = requests.get(url, headers=headers)
        status_code = response.status_code
        if status_code == OK:
            data = schema.load(response.json(), partial=True)
        else:
            print(f'Failed with status code {status_code}')
        #print(data)
        return data
    

