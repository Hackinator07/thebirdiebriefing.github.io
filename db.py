from sqlalchemy import (create_engine, MetaData, Integer)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import app
db = SQLAlchemy()

class BaseModel(object):
    @classmethod
    def new(cls, **kwargs):
        obj = cls(**kwargs)
        db.session.add(obj)
        db.session.commit()
        return obj

    @classmethod
    def get(cls, **kwargs):
        result = cls.query.filter_by(**kwargs).first()
        return result

    @classmethod
    def get_all(cls, **kwargs):
        result = cls.query.filter_by(**kwargs).all()
        return result

    def update(self, **kwargs):
        for column, value in kwargs.items():
            setattr(self, column, value)

        db.session.add(self)
        db.session.commit()
        return self

    def __repr__(self):
        columns = dict((column.name, getattr(self, column.name)) for column in self.__table__.columns)
        
        column_strings = []
        for column, value in columns.items():
            column_strings.append(f'{column}: {value}')

        repr = f"<{self.__class__.__name__} {', '.join(column_strings)}>"
        return repr


class Soccer_standings(BaseModel, db.Model):
    __tablename__ = 'soccer_standings'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    league_name = db.Column(db.String(255))
    league_code = db.Column(db.String(255))
    season_year = db.Column(db.Integer)
    team_name =db.Column(db.String(255))
    gp = db.Column(db.Integer)
    w = db.Column(db.Integer)
    d = db.Column(db.Integer)
    l = db.Column(db.Integer)
    f = db.Column(db.Integer)
    a = db.Column(db.Integer)
    gd = db.Column(db.Integer)  	
    p = db.Column(db.Integer)  


class LPGA_Tournament(BaseModel, db.Model):
    __tablename__ = 'lpga_tournaments'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    espn_id = db.Column(db.String(50), unique=True)  # ESPN tournament ID
    name = db.Column(db.String(255))
    short_name = db.Column(db.String(255))
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    status = db.Column(db.String(50))  # scheduled, in_progress, completed
    broadcast = db.Column(db.String(100))  # Golf Channel, etc.
    season_year = db.Column(db.Integer)
    
    # Relationships
    rounds = relationship("LPGA_Round", back_populates="tournament")
    players = relationship("LPGA_TournamentPlayer", back_populates="tournament")

class LPGA_Player(BaseModel, db.Model):
    __tablename__ = 'lpga_players'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    espn_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(255))
    display_name = db.Column(db.String(255))  # ESPN display name
    short_name = db.Column(db.String(100))   # ESPN short name
    country = db.Column(db.String(100))
    country_flag_url = db.Column(db.String(500))  # Country flag URL
    
    # Relationships
    tournament_entries = relationship("LPGA_TournamentPlayer", back_populates="player")

class LPGA_TournamentPlayer(BaseModel, db.Model):
    __tablename__ = 'lpga_tournament_players'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey('lpga_tournaments.id'))
    player_id = db.Column(db.Integer, db.ForeignKey('lpga_players.id'))
    position = db.Column(db.Integer)  # Final position in tournament
    total_score = db.Column(db.Integer)  # Total strokes
    total_to_par = db.Column(db.Integer)  # Total score relative to par
    earnings = db.Column(db.Float)  # Prize money
    
    # Relationships
    tournament = relationship("LPGA_Tournament", back_populates="players")
    player = relationship("LPGA_Player", back_populates="tournament_entries")
    rounds = relationship("LPGA_Round", back_populates="tournament_player")

class LPGA_Round(BaseModel, db.Model):
    __tablename__ = 'lpga_rounds'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey('lpga_tournaments.id'))
    tournament_player_id = db.Column(db.Integer, db.ForeignKey('lpga_tournament_players.id'))
    round_number = db.Column(db.Integer)  # 1, 2, 3, 4
    score = db.Column(db.Integer)  # Strokes for this round
    to_par = db.Column(db.Integer)  # Score relative to par
    position = db.Column(db.Integer)  # Position after this round
    completion_time = db.Column(db.DateTime)  # Round completion timestamp
    statistics = db.Column(db.JSON)  # JSON for detailed statistics
    
    # Relationships
    tournament = relationship("LPGA_Tournament", back_populates="rounds")
    tournament_player = relationship("LPGA_TournamentPlayer", back_populates="rounds")
