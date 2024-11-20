"""Module to persist data into the database."""

import psycopg2

class Persister:
    def __init__(self, database: str, user: str, host: str, 
            password: str, port: int):
        self.database = database
        self.user = user
        self.host = host
        self.password = password
        self.port = port

    def _connect(database: str, user: str, host: str, password: str, port: int):
        conn = psycopg2.connect(
            database = database,
            user = user,
            host = host,
            password = password,
            port = port)
        
        cursor = conn.cursor()
        return cursor
        

