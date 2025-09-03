from flask import Flask, jsonify
from flask_cors import CORS
import db
import requests
from datetime import datetime
import json
import logging
import os

def create_app():
    app = Flask(__name__)
    
    # Production CORS configuration
    if os.environ.get('FLASK_ENV') == 'production':
        # Production: restrict to specific domains
        CORS(app, origins=[
            "https://thebirdiebriefing.github.io",
            "https://birdiebriefing.com",
            "https://www.birdiebriefing.com"
        ])
    else:
        # Development: allow local development
        CORS(app, origins=[
            "http://localhost:3000", 
            "http://127.0.0.1:3000", 
            "http://localhost:3001", 
            "http://10.0.1.104:3000", 
            "http://10.0.1.104:3001", 
            "http://10.0.1.104:3002"
        ])
    
    # Production database configuration
    app.config['SQLALCHEMY_POOL_SIZE'] = 50  # Reduced for production
    app.config['SQLALCHEMY_POOL_RECYCLE'] = 280
    app.config['SQLALCHEMY_POOL_TIMEOUT'] = 100
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', "sqlite:///espn_API.db?check_same_thread=False")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['MAX_THREADS'] = 20  # Reduced for production
    app.config['THREADS_PER_WORKER'] = 5  # Reduced for production
    app.config['DEBUG'] = os.environ.get('FLASK_ENV') != 'production'

    # Configure logging for production
    if not app.debug:
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        )
        app.logger.setLevel(logging.INFO)
        app.logger.info('Birdie Briefing LPGA API startup')

    # initialize database connections
    db.db.init_app(app)
    with app.app_context():
        db.db.create_all()
        
    @app.route('/')
    def index():
        return 'Hello, World!'

    @app.route('/create_soccer_database')
    def create_soccer_database():
        try:
            with app.app_context():
                league_code = 'eng.1'
                for year in range(2001, 2024):
                    try:
                        url = f"https://site.web.api.espn.com/apis/v2/sports/soccer/{league_code}/standings?season={year}"
                        response = requests.get(url)
                        data = response.json()
                        league_name = data['name']
                        season_year = year
                        data = data['children'][0]['standings']['entries']
                        for team in data:
                            stats = team["stats"]
                            team_name = team['team']['name']
                            gp = next(s["value"] for s in stats if s["name"] == "gamesPlayed")
                            w = next(s["value"] for s in stats if s["name"] == "wins")
                            d = next(s["value"] for s in stats if s["name"] == "ties")
                            l = next(s["value"] for s in stats if s["name"] == "losses")
                            f = next(s["value"] for s in stats if s["name"] == "pointsFor")
                            a = next(s["value"] for s in stats if s["name"] == "pointsAgainst")
                            gd = next(s["value"] for s in stats if s["name"] == "pointDifferential")
                            p = next(s["value"] for s in stats if s["name"] == "points")
                            previous_entry = db.Soccer_standings.get(
                                    league_name=league_name,
                                    league_code = league_code,
                                    season_year=season_year,
                                    team_name=team_name,
                                    gp=gp,
                                    w=w,
                                    d=d,
                                    l=l,
                                    f=f,
                                    a=a,
                                    gd=gd)
                            if not previous_entry:
                                db.Soccer_standings.new(
                                        league_name=league_name,
                                        league_code = league_code,
                                        season_year=season_year,
                                        team_name=team_name,
                                        gp=gp,
                                        w=w,
                                        d=d,
                                        l=l,
                                        f=f,
                                        a=a,
                                        gd=gd,
                                        p=p)
                            else:
                                app.logger.debug('Soccer entry previously added to database')
                    except Exception as e:
                        app.logger.error(f"Error processing soccer data for year {year}: {e}")  
        except Exception as e:
            app.logger.error(f"Error creating soccer database: {e}")
            return {'code': 500, 'message': 'Internal server error.'}
        return {'code': 200, 'message': 'Soccer database created successfully'}

    # LPGA Tournament Endpoints
    
    @app.route('/fetch_lpga_tournaments')
    def fetch_lpga_tournaments():
        """Fetch all LPGA tournaments for the 2025 season using multiple ESPN endpoints"""
        try:
            # Clear existing tournaments first
            existing_tournaments = db.LPGA_Tournament.get_all()
            for tournament in existing_tournaments:
                db.db.session.delete(tournament)
            db.db.session.commit()
            
            # 1. Fetch main tournament schedule from scoreboard endpoint
            scoreboard_url = "http://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard"
            scoreboard_response = requests.get(scoreboard_url)
            scoreboard_data = scoreboard_response.json()
            
            # 2. Fetch current events for status information
            events_url = "http://site.api.espn.com/apis/site/v2/sports/golf/lpga/events"
            events_response = requests.get(events_url)
            events_data = events_response.json()
            
            # 3. Fetch league info for season details
            teams_url = "http://site.api.espn.com/apis/site/v2/sports/golf/lpga/teams"
            teams_response = requests.get(teams_url)
            teams_data = teams_response.json()
            
            # The ESPN API returns leagues with calendar
            if 'leagues' not in scoreboard_data or not scoreboard_data['leagues']:
                return jsonify({'code': 500, 'message': 'No leagues data found in ESPN response'})
            
            league = scoreboard_data['leagues'][0]
            if 'calendar' not in league:
                return jsonify({'code': 500, 'message': 'No calendar data found in ESPN response'})
            
            tournaments = league['calendar']
            added_count = 0
            
            # Create a map of current events for status lookup
            current_events = {}
            if 'events' in events_data:
                for event in events_data['events']:
                    current_events[event['id']] = event
            
            # Process each tournament from the calendar
            for tournament_data in tournaments:
                try:
                    # Extract tournament info
                    tournament_id = tournament_data.get('id')
                    tournament_name = tournament_data.get('label', 'Unknown Tournament')
                    
                    if not tournament_id:
                        continue
                    
                    # Get tournament dates
                    start_date = None
                    end_date = None
                    
                    if 'startDate' in tournament_data:
                        start_date = datetime.fromisoformat(tournament_data['startDate'].replace('Z', '+00:00'))
                    if 'endDate' in tournament_data:
                        end_date = datetime.fromisoformat(tournament_data['endDate'].replace('Z', '+00:00'))
                    
                    # Determine tournament status using multiple sources
                    tournament_status = 'scheduled'  # Default status
                    
                    # Check current events for real-time status
                    if tournament_id in current_events:
                        event = current_events[tournament_id]
                        if 'fullStatus' in event and 'type' in event['fullStatus']:
                            status_type = event['fullStatus']['type']
                            if status_type.get('completed', False) or status_type.get('state') == 'post':
                                tournament_status = 'completed'
                            elif status_type.get('state') == 'in':
                                tournament_status = 'in_progress'
                            elif status_type.get('state') == 'pre':
                                tournament_status = 'scheduled'
                    
                    # Fallback to scoreboard events data
                    elif 'events' in scoreboard_data:
                        for event in scoreboard_data['events']:
                            if event.get('id') == tournament_id:
                                if 'status' in event and 'type' in event['status']:
                                    status_type = event['status']['type']
                                    if status_type.get('completed', False) or status_type.get('state') == 'post':
                                        tournament_status = 'completed'
                                    elif status_type.get('state') == 'in':
                                        tournament_status = 'in_progress'
                                    elif status_type.get('state') == 'pre':
                                        tournament_status = 'scheduled'
                                break
                    
                    # Create tournament record
                    db.LPGA_Tournament.new(
                        espn_id=tournament_id,
                        name=tournament_name,
                        short_name=tournament_name[:50],
                        start_date=start_date,
                        end_date=end_date,
                        season_year=2025,  # These are 2025 tournaments
                        status=tournament_status
                    )
                    added_count += 1
                    
                except Exception as e:
                    app.logger.error(f"Error processing tournament {tournament_data.get('id', 'unknown')}: {e}")
                    continue
            
            return jsonify({
                'code': 200, 
                'message': f'Successfully fetched {len(tournaments)} tournaments, added {added_count} new ones',
                'total_tournaments': len(tournaments),
                'new_tournaments': added_count,
                'data_sources': ['scoreboard', 'events', 'teams']
            })
            
        except Exception as e:
            app.logger.error(f"Error fetching LPGA tournaments: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/tournaments')
    def get_tournaments():
        """Get all tournaments from database"""
        try:
            tournaments = db.LPGA_Tournament.get_all()
            tournament_list = []
            
            for tournament in tournaments:
                tournament_list.append({
                    'id': tournament.id,
                    'espn_id': tournament.espn_id,
                    'name': tournament.name,
                    'start_date': tournament.start_date.isoformat() if tournament.start_date else None,
                    'end_date': tournament.end_date.isoformat() if tournament.end_date else None,
                    'status': tournament.status,
                    'season_year': tournament.season_year
                })
            
            return jsonify({
                'code': 200,
                'tournaments': tournament_list,
                'count': len(tournament_list)
            })
            
        except Exception as e:
            app.logger.error(f"Error getting tournaments: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/tournament/<espn_id>')
    def get_tournament(espn_id):
        """Get specific tournament details"""
        try:
            tournament = db.LPGA_Tournament.get(espn_id=espn_id)
            
            if not tournament:
                return jsonify({'code': 404, 'message': 'Tournament not found'})
            
            return jsonify({
                'code': 200,
                'tournament': {
                    'id': tournament.id,
                    'espn_id': tournament.espn_id,
                    'name': tournament.name,
                    'start_date': tournament.start_date.isoformat() if tournament.start_date else None,
                    'end_date': tournament.end_date.isoformat() if tournament.end_date else None,
                    'status': tournament.status,
                    'season_year': tournament.season_year
                }
            })
            
        except Exception as e:
            app.logger.error(f"Error getting tournament: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/fetch_tournament_leaderboard/<espn_id>')
    def fetch_tournament_leaderboard(espn_id):
        """Fetch live leaderboard data for a specific tournament"""
        try:
            # First check if tournament exists in our database
            tournament = db.LPGA_Tournament.get(espn_id=espn_id)
            if not tournament:
                return jsonify({'code': 404, 'message': 'Tournament not found in database'})
            
            # Fetch live data from ESPN
            url = f"http://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard/{espn_id}"
            response = requests.get(url)
            data = response.json()
            
            # Process leaderboard data
            processed_data = process_leaderboard_data(data, tournament.id)
            
            return jsonify({
                'code': 200,
                'message': 'Leaderboard data processed successfully',
                'tournament_id': espn_id,
                'players_processed': processed_data['players_processed'],
                'rounds_processed': processed_data['rounds_processed']
            })
            
        except Exception as e:
            app.logger.error(f"Error fetching tournament leaderboard: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/tournament/<espn_id>/leaderboard')
    def get_tournament_leaderboard(espn_id):
        """Get current leaderboard for a tournament from database"""
        try:
            tournament = db.LPGA_Tournament.get(espn_id=espn_id)
            if not tournament:
                return jsonify({'code': 404, 'message': 'Tournament not found'})
            
            # Get all players in the tournament with their scores
            tournament_players = db.LPGA_TournamentPlayer.get_all(tournament_id=tournament.id)
            
            leaderboard = []
            for tp in tournament_players:
                player = db.LPGA_Player.get(id=tp.player_id)
                rounds = db.LPGA_Round.get_all(tournament_player_id=tp.id)
                
                leaderboard.append({
                    'position': tp.position,
                    'player_name': player.name if player else 'Unknown',
                    'total_score': tp.total_score,
                    'total_to_par': tp.total_to_par,
                    'rounds': [
                        {
                            'round': r.round_number,
                            'score': r.score,
                            'to_par': r.to_par,
                            'position': r.position
                        } for r in rounds
                    ]
                })
            
            # Sort by position
            leaderboard.sort(key=lambda x: x['position'] if x['position'] else 999)
            
            return jsonify({
                'code': 200,
                'tournament_name': tournament.name,
                'leaderboard': leaderboard
            })
            
        except Exception as e:
            app.logger.error(f"Error getting tournament leaderboard: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    # Analytics Endpoints
    
    @app.route('/analytics/player/<player_id>')
    def get_player_analytics(player_id):
        """Get comprehensive analytics for a specific player"""
        try:
            player = db.LPGA_Player.get(id=player_id)
            if not player:
                return jsonify({'code': 404, 'message': 'Player not found'})
            
            # Get all tournament entries for this player
            tournament_entries = db.LPGA_TournamentPlayer.get_all(player_id=player_id)
            
            analytics = {
                'player_name': player.name,
                'tournaments_played': len(tournament_entries),
                'best_finish': min([tp.position for tp in tournament_entries if tp.position]) if tournament_entries else None,
                'average_position': sum([tp.position for tp in tournament_entries if tp.position]) / len([tp for tp in tournament_entries if tp.position]) if tournament_entries else None,
                'total_earnings': sum([tp.earnings for tp in tournament_entries if tp.earnings]) if tournament_entries else 0,
                'tournament_history': []
            }
            
            for tp in tournament_entries:
                tournament = db.LPGA_Tournament.get(id=tp.tournament_id)
                analytics['tournament_history'].append({
                    'tournament_name': tournament.name if tournament else 'Unknown',
                    'year': tournament.season_year if tournament else None,
                    'position': tp.position,
                    'total_score': tp.total_score,
                    'total_to_par': tp.total_to_par,
                    'earnings': tp.earnings
                })
            
            return jsonify({
                'code': 200,
                'analytics': analytics
            })
            
        except Exception as e:
            app.logger.error(f"Error getting player analytics: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/analytics/season/<year>')
    def get_season_analytics(year):
        """Get analytics for a specific season"""
        try:
            year = int(year)
            tournaments = db.LPGA_Tournament.get_all(season_year=year)
            
            season_stats = {
                'year': year,
                'total_tournaments': len(tournaments),
                'completed_tournaments': len([t for t in tournaments if t.status == 'completed']),
                'in_progress_tournaments': len([t for t in tournaments if t.status == 'in_progress']),
                'scheduled_tournaments': len([t for t in tournaments if t.status == 'scheduled']),
                'tournaments': []
            }
            
            for tournament in tournaments:
                tournament_players = db.LPGA_TournamentPlayer.get_all(tournament_id=tournament.id)
                
                tournament_stats = {
                    'name': tournament.name,
                    'status': tournament.status,
                    'players_count': len(tournament_players),
                    'winner': None
                }
                
                if tournament_players:
                    winner = min(tournament_players, key=lambda x: x.position if x.position else 999)
                    if winner.position == 1:
                        player = db.LPGA_Player.get(id=winner.player_id)
                        tournament_stats['winner'] = player.name if player else 'Unknown'
                
                season_stats['tournaments'].append(tournament_stats)
            
            return jsonify({
                'code': 200,
                'season_stats': season_stats
            })
            
        except Exception as e:
            app.logger.error(f"Error getting season analytics: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    # New Tournament Management Endpoints
    
    @app.route('/tournament/<espn_id>/refresh')
    def refresh_tournament(espn_id):
        """Manually refresh tournament data from ESPN"""
        try:
            tournament = db.LPGA_Tournament.get(espn_id=espn_id)
            if not tournament:
                return jsonify({'code': 404, 'message': 'Tournament not found in database'})
            
            # Fetch fresh data from ESPN
            url = f"http://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard/{espn_id}"
            response = requests.get(url)
            data = response.json()
            
            # Process the fresh data
            processed_data = process_leaderboard_data(data, tournament.id)
            
            return jsonify({
                'code': 200,
                'message': 'Tournament refreshed successfully',
                'tournament_id': espn_id,
                'tournament_name': tournament.name,
                'players_processed': processed_data['players_processed'],
                'rounds_processed': processed_data['rounds_processed'],
                'current_status': tournament.status
            })
            
        except Exception as e:
            app.logger.error(f"Error refreshing tournament: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/tournament/<espn_id>/status')
    def get_tournament_status(espn_id):
        """Get detailed tournament status and progress"""
        try:
            tournament = db.LPGA_Tournament.get(espn_id=espn_id)
            if not tournament:
                return jsonify({'code': 404, 'message': 'Tournament not found'})
            
            # Get tournament players and their progress
            tournament_players = db.LPGA_TournamentPlayer.get_all(tournament_id=tournament.id)
            
                        # Count tournament rounds completed (not individual player rounds)
            # A tournament round is complete when most players have completed that round
            tournament_rounds_completed = 0
            if tournament_players:
                # Get the maximum round number that any player has completed
                max_round_completed = 0
                for tp in tournament_players:
                    rounds = db.LPGA_Round.get_all(tournament_player_id=tp.id)
                    if rounds:
                        max_round_completed = max(max_round_completed, max(r.round_number for r in rounds))
                
                # Check if this round is complete for most players
                if max_round_completed > 0:
                    players_with_max_round = 0
                    for tp in tournament_players:
                        rounds = db.LPGA_Round.get_all(tournament_player_id=tp.id)
                        if any(r.round_number == max_round_completed for r in rounds):
                            players_with_max_round += 1
                    
                    # If most players have completed this round, consider it a tournament round
                    completion_threshold = len(tournament_players) * 0.5  # 50% threshold (more reasonable)
                    if players_with_max_round >= completion_threshold:
                        tournament_rounds_completed = max_round_completed
                    
                    # Debug logging
                    app.logger.debug(f"Tournament {tournament.name}: {players_with_max_round}/{len(tournament_players)} players have round {max_round_completed}, threshold: {completion_threshold}")
            
            status_info = {
                'tournament_id': espn_id,
                'tournament_name': tournament.name,
                'status': tournament.status,
                'start_date': tournament.start_date.isoformat() if tournament.start_date else None,
                'end_date': tournament.end_date.isoformat() if tournament.end_date else None,
                'players_count': len(tournament_players),
                'rounds_completed': tournament_rounds_completed,
                'total_rounds': 4,  # LPGA tournaments are typically 4 rounds
                'progress_percentage': (tournament_rounds_completed / 4) * 100 if tournament_rounds_completed > 0 else 0
            }
            
            return jsonify({
                'code': 200,
                'status_info': status_info
            })
            
        except Exception as e:
            app.logger.error(f"Error getting tournament status: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/players')
    def get_all_players():
        """Get all players in the database"""
        try:
            players = db.LPGA_Player.get_all()
            player_list = []
            
            for player in players:
                # Get tournament count for each player
                tournament_entries = db.LPGA_TournamentPlayer.get_all(player_id=player.id)
                
                player_list.append({
                    'id': player.id,
                    'espn_id': player.espn_id,
                    'name': player.name,
                    'display_name': player.display_name,
                    'short_name': player.short_name,
                    'country': player.country,
                    'country_flag_url': player.country_flag_url,
                    'tournaments_played': len(tournament_entries)
                })
            
            return jsonify({
                'code': 200,
                'players': player_list,
                'count': len(player_list)
            })
            
        except Exception as e:
            app.logger.error(f"Error getting players: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/players/enhanced')
    def get_enhanced_players():
        """Get enhanced player information with detailed statistics"""
        try:
            players = db.LPGA_Player.get_all()
            enhanced_players = []
            
            for player in players:
                # Get tournament entries and calculate statistics
                tournament_entries = db.LPGA_TournamentPlayer.get_all(player_id=player.id)
                
                # Calculate career statistics
                total_earnings = sum([tp.earnings for tp in tournament_entries if tp.earnings]) if tournament_entries else 0
                best_finish = min([tp.position for tp in tournament_entries if tp.position]) if tournament_entries else None
                worst_finish = max([tp.position for tp in tournament_entries if tp.position]) if tournament_entries else None
                
                # Get recent performance (last 5 tournaments)
                recent_tournaments = sorted(tournament_entries, key=lambda x: x.id, reverse=True)[:5]
                recent_performance = []
                
                for tp in recent_tournaments:
                    tournament = db.LPGA_Tournament.get(id=tp.tournament_id)
                    recent_performance.append({
                        'tournament_name': tournament.name if tournament else 'Unknown',
                        'position': tp.position,
                        'total_score': tp.total_score,
                        'total_to_par': tp.total_to_par,
                        'year': tournament.season_year if tournament else None
                    })
                
                enhanced_player = {
                    'id': player.id,
                    'espn_id': player.espn_id,
                    'name': player.name,
                    'display_name': player.display_name,
                    'short_name': player.short_name,
                    'country': player.country,
                    'country_flag_url': player.country_flag_url,
                    'career_stats': {
                        'tournaments_played': len(tournament_entries),
                        'total_earnings': total_earnings,
                        'best_finish': best_finish,
                        'worst_finish': worst_finish,
                        'average_position': sum([tp.position for tp in tournament_entries if tp.position]) / len([tp for tp in tournament_entries if tp.position]) if tournament_entries else None
                    },
                    'recent_performance': recent_performance
                }
                
                enhanced_players.append(enhanced_player)
            
            return jsonify({
                'code': 200,
                'enhanced_players': enhanced_players,
                'count': len(enhanced_players)
            })
            
        except Exception as e:
            app.logger.error(f"Error getting enhanced players: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/lpga_news')
    def get_lpga_news():
        """Get latest LPGA news and tournament updates"""
        try:
            news_url = "http://site.api.espn.com/apis/site/v2/sports/golf/lpga/news"
            response = requests.get(news_url)
            data = response.json()
            
            if 'articles' not in data:
                return jsonify({'code': 500, 'message': 'No news data found'})
            
            # Extract relevant news articles
            news_articles = []
            for article in data['articles'][:10]:  # Limit to 10 most recent
                news_articles.append({
                    'id': article.get('id'),
                    'headline': article.get('headline'),
                    'description': article.get('description'),
                    'published': article.get('published'),
                    'last_modified': article.get('lastModified'),
                    'image_url': article.get('images', [{}])[0].get('url') if article.get('images') else None,
                    'image_credit': article.get('images', [{}])[0].get('credit') if article.get('images') else None
                })
            
            return jsonify({
                'code': 200,
                'news': news_articles,
                'count': len(news_articles),
                'source': 'ESPN LPGA News API'
            })
            
        except Exception as e:
            app.logger.error(f"Error fetching LPGA news: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/lpga_league_info')
    def get_lpga_league_info():
        """Get LPGA league information and season details"""
        try:
            teams_url = "http://site.api.espn.com/apis/site/v2/sports/golf/lpga/teams"
            response = requests.get(teams_url)
            data = response.json()
            
            if 'sports' not in data or not data['sports']:
                return jsonify({'code': 500, 'message': 'No league data found'})
            
            golf_sport = data['sports'][0]
            lpga_league = golf_sport['leagues'][0]
            
            league_info = {
                'league_id': lpga_league.get('id'),
                'name': lpga_league.get('name'),
                'abbreviation': lpga_league.get('abbreviation'),
                'short_name': lpga_league.get('shortName'),
                'season_year': lpga_league.get('year'),
                'season_display': lpga_league.get('season', {}).get('displayName')
            }
            
            return jsonify({
                'code': 200,
                'league_info': league_info,
                'source': 'ESPN LPGA Teams API'
            })
            
        except Exception as e:
            app.logger.error(f"Error fetching LPGA league info: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/lpga_current_events')
    def get_lpga_current_events():
        """Get current LPGA events and their real-time status"""
        try:
            events_url = "http://site.api.espn.com/apis/site/v2/sports/golf/lpga/events"
            response = requests.get(events_url)
            data = response.json()
            
            if 'events' not in data:
                return jsonify({'code': 500, 'message': 'No events data found'})
            
            current_events = []
            for event in data['events']:
                event_info = {
                    'id': event.get('id'),
                    'name': event.get('name'),
                    'short_name': event.get('shortName'),
                    'date': event.get('date'),
                    'status': {
                        'state': event.get('fullStatus', {}).get('type', {}).get('state'),
                        'description': event.get('fullStatus', {}).get('type', {}).get('description'),
                        'detail': event.get('fullStatus', {}).get('type', {}).get('detail'),
                        'short_detail': event.get('fullStatus', {}).get('type', {}).get('shortDetail'),
                        'completed': event.get('fullStatus', {}).get('type', {}).get('completed', False)
                    },
                    'links': event.get('links', [])
                }
                current_events.append(event_info)
            
            return jsonify({
                'code': 200,
                'current_events': current_events,
                'count': len(current_events),
                'source': 'ESPN LPGA Events API'
            })
            
        except Exception as e:
            app.logger.error(f"Error fetching LPGA current events: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/update_tournament_statuses')
    def update_tournament_statuses():
        """Update tournament statuses by checking individual tournament data"""
        try:
            tournaments = db.LPGA_Tournament.get_all()
            updated_count = 0
            
            for tournament in tournaments:
                try:
                    # Fetch individual tournament data to get real status
                    url = f"http://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard/{tournament.espn_id}"
                    response = requests.get(url)
                    data = response.json()
                    
                    # Check if tournament has status data
                    if 'status' in data and 'type' in data['status']:
                        status_type = data['status']['type']
                        new_status = 'scheduled'  # Default
                        
                        if status_type.get('completed', False) or status_type.get('state') == 'post':
                            new_status = 'completed'
                        elif status_type.get('state') == 'in':
                            new_status = 'in_progress'
                        elif status_type.get('state') == 'pre':
                            new_status = 'scheduled'
                        
                        # Update if status changed
                        if tournament.status != new_status:
                            tournament.update(status=new_status)
                            updated_count += 1
                            app.logger.info(f"Updated {tournament.name} from {tournament.status} to {new_status}")
                    
                    # Small delay to avoid overwhelming ESPN's API
                    import time
                    time.sleep(0.1)
                    
                        except Exception as e:
            app.logger.error(f"Error updating tournament {tournament.name}: {e}")
            continue
            
            db.db.session.commit()
            
            return jsonify({
                'code': 200,
                'message': f'Updated {updated_count} tournament statuses',
                'tournaments_checked': len(tournaments),
                'statuses_updated': updated_count
            })
            
        except Exception as e:
            app.logger.error(f"Error updating tournament statuses: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})



    @app.route('/tournament/<espn_id>/detailed_stats')
    def get_tournament_detailed_stats(espn_id):
        """Get detailed statistics for a tournament including round completion times"""
        try:
            tournament = db.LPGA_Tournament.get(espn_id=espn_id)
            if not tournament:
                return jsonify({'code': 404, 'message': 'Tournament not found'})
            
            # Fetch fresh data from ESPN for detailed stats
            url = f"http://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard/{espn_id}"
            response = requests.get(url)
            data = response.json()
            
            if 'competitions' not in data or not data['competitions']:
                return jsonify({'code': 500, 'message': 'No competition data found'})
            
            competition = data['competitions'][0]
            detailed_stats = []
            
            if 'competitors' in competition:
                for competitor in competition['competitors']:
                    player_stats = {
                        'player_id': competitor.get('id'),
                        'player_name': competitor.get('athlete', {}).get('fullName'),
                        'display_name': competitor.get('athlete', {}).get('displayName'),
                        'short_name': competitor.get('athlete', {}).get('shortName'),
                        'country': competitor.get('athlete', {}).get('flag', {}).get('alt'),
                        'country_flag_url': competitor.get('athlete', {}).get('flag', {}).get('href'),
                        'position': competitor.get('order'),
                        'total_score': competitor.get('score'),
                        'rounds': []
                    }
                    
                    # Process round-by-round data with timestamps
                    linescores = competitor.get('linescores', [])
                    for round_data in linescores:
                        round_info = {
                            'round_number': round_data.get('period'),
                            'score': round_data.get('value'),
                            'to_par': round_data.get('displayValue'),
                            'completion_time': None,
                            'statistics': []
                        }
                        
                        # Extract completion timestamp from statistics
                        if 'statistics' in round_data and round_data['statistics']:
                            for stat_category in round_data['statistics']:
                                if isinstance(stat_category, dict) and 'categories' in stat_category and stat_category['categories']:
                                    for category in stat_category['categories']:
                                        if isinstance(category, dict) and 'stats' in category and category['stats']:
                                            for stat in category['stats']:
                                                if isinstance(stat, dict):
                                                    if stat.get('displayValue') and 'PDT' in str(stat.get('displayValue')):
                                                        round_info['completion_time'] = stat.get('displayValue')
                                                    round_info['statistics'].append({
                                                        'name': stat.get('name'),
                                                        'value': stat.get('value'),
                                                        'display_value': stat.get('displayValue')
                                                    })
                        
                        player_stats['rounds'].append(round_info)
                    
                    detailed_stats.append(player_stats)
            
            return jsonify({
                'code': 200,
                'tournament_id': espn_id,
                'tournament_name': tournament.name,
                'detailed_stats': detailed_stats,
                'players_count': len(detailed_stats)
            })
            
        except Exception as e:
            app.logger.error(f"Error getting detailed stats: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/tournament/<espn_id>/round_analysis')
    def get_tournament_round_analysis(espn_id):
        """Get round-by-round analysis for a tournament"""
        try:
            tournament = db.LPGA_Tournament.get(espn_id=espn_id)
            if not tournament:
                return jsonify({'code': 404, 'message': 'Tournament not found'})
            
            # Fetch fresh data from ESPN
            url = f"http://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard/{espn_id}"
            response = requests.get(url)
            data = response.json()
            
            if 'competitions' not in data or not data['competitions']:
                return jsonify({'code': 500, 'message': 'No competition data found'})
            
            competition = data['competitions'][0]
            round_analysis = {}
            
            if 'competitors' in competition:
                for competitor in competition['competitors']:
                    player_name = competitor.get('athlete', {}).get('fullName')
                    linescores = competitor.get('linescores', [])
                    
                    for round_data in linescores:
                        round_num = round_data.get('period')
                        if round_num not in round_analysis:
                            round_analysis[round_num] = {
                                'round_number': round_num,
                                'players': [],
                                'best_score': None,
                                'worst_score': None,
                                'average_score': 0,
                                'completion_times': []
                            }
                        
                        score = round_data.get('value')
                        to_par = round_data.get('displayValue')
                        completion_time = None
                        
                        # Extract completion time
                        if 'statistics' in round_data and round_data['statistics']:
                            for stat_category in round_data['statistics']:
                                if isinstance(stat_category, dict) and 'categories' in stat_category and stat_category['categories']:
                                    for category in stat_category['categories']:
                                        if isinstance(category, dict) and 'stats' in category and category['stats']:
                                            for stat in category['stats']:
                                                if isinstance(stat, dict) and stat.get('displayValue') and 'PDT' in str(stat.get('displayValue')):
                                                    completion_time = stat.get('displayValue')
                        
                        round_analysis[round_num]['players'].append({
                            'player_name': player_name,
                            'score': score,
                            'to_par': to_par,
                            'completion_time': completion_time
                        })
                        
                        if completion_time:
                            round_analysis[round_num]['completion_times'].append(completion_time)
                
                # Calculate round statistics
                for round_num in round_analysis:
                    scores = [p['score'] for p in round_analysis[round_num]['players'] if p['score'] is not None]
                    if scores:
                        round_analysis[round_num]['best_score'] = min(scores)
                        round_analysis[round_num]['worst_score'] = max(scores)
                        round_analysis[round_num]['average_score'] = sum(scores) / len(scores)
            
            return jsonify({
                'code': 200,
                'tournament_id': espn_id,
                'tournament_name': tournament.name,
                'round_analysis': round_analysis
            })
            
        except Exception as e:
            app.logger.error(f"Error getting round analysis: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/tournament/<espn_id>/player_progress')
    def get_player_progress(espn_id):
        """Get individual player progress throughout the tournament"""
        try:
            tournament = db.LPGA_Tournament.get(espn_id=espn_id)
            if not tournament:
                return jsonify({'code': 404, 'message': 'Tournament not found'})
            
            # Fetch fresh data from ESPN
            url = f"http://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard/{espn_id}"
            response = requests.get(url)
            data = response.json()
            
            if 'competitions' not in data or not data['competitions']:
                return jsonify({'code': 500, 'message': 'No competition data found'})
            
            competition = data['competitions'][0]
            player_progress = []
            
            if 'competitors' in competition:
                for competitor in competition['competitors']:
                    player_info = {
                        'player_id': competitor.get('id'),
                        'player_name': competitor.get('athlete', {}).get('fullName'),
                        'display_name': competitor.get('athlete', {}).get('displayName'),
                        'country': competitor.get('athlete', {}).get('flag', {}).get('alt'),
                        'final_position': competitor.get('order'),
                        'final_score': competitor.get('score'),
                        'round_progress': [],
                        'position_progression': [],
                        'score_progression': []
                    }
                    
                    linescores = competitor.get('linescores', [])
                    cumulative_score = 0
                    
                    for i, round_data in enumerate(linescores):
                        round_num = round_data.get('period')
                        score = round_data.get('value')
                        to_par = round_data.get('displayValue')
                        
                        if score is not None:
                            cumulative_score += score
                        
                        round_info = {
                            'round': round_num,
                            'score': score,
                            'to_par': to_par,
                            'cumulative_score': cumulative_score,
                            'completion_time': None
                        }
                        
                        # Extract completion time
                        if 'statistics' in round_data and round_data['statistics']:
                            for stat_category in round_data['statistics']:
                                if isinstance(stat_category, dict) and 'categories' in stat_category and stat_category['categories']:
                                    for category in stat_category['categories']:
                                        if isinstance(category, dict) and 'stats' in category and category['stats']:
                                            for stat in category['stats']:
                                                if isinstance(stat, dict) and stat.get('displayValue') and 'PDT' in str(stat.get('displayValue')):
                                                    round_info['completion_time'] = stat.get('displayValue')
                        
                        player_info['round_progress'].append(round_info)
                        player_info['score_progression'].append(cumulative_score)
                    
                    player_progress.append(player_info)
            
            return jsonify({
                'code': 200,
                'tournament_id': espn_id,
                'tournament_name': tournament.name,
                'player_progress': player_progress,
                'players_count': len(player_progress)
            })
            
        except Exception as e:
            app.logger.error(f"Error getting player progress: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    @app.route('/refresh_all_tournaments')
    def refresh_all_tournaments():
        """Refresh all tournaments from ESPN (useful for live updates)"""
        try:
            tournaments = db.LPGA_Tournament.get_all()
            refresh_results = []
            
            for tournament in tournaments:
                try:
                    # Fetch fresh data for each tournament
                    url = f"http://site.api.espn.com/apis/site/v2/sports/golf/lpga/scoreboard/{tournament.espn_id}"
                    response = requests.get(url)
                    data = response.json()
                    
                    # Process the data
                    processed_data = process_leaderboard_data(data, tournament.id)
                    
                    refresh_results.append({
                        'tournament_id': tournament.espn_id,
                        'tournament_name': tournament.name,
                        'status': tournament.status,
                        'players_processed': processed_data['players_processed'],
                        'rounds_processed': processed_data['rounds_processed']
                    })
                    
                    # Small delay to avoid overwhelming ESPN's API
                    import time
                    time.sleep(0.5)
                    
                except Exception as e:
                    refresh_results.append({
                        'tournament_id': tournament.espn_id,
                        'tournament_name': tournament.name,
                        'error': str(e)
                    })
            
            return jsonify({
                'code': 200,
                'message': f'Refreshed {len(tournaments)} tournaments',
                'results': refresh_results
            })
            
        except Exception as e:
            app.logger.error(f"Error refreshing all tournaments: {e}")
            return jsonify({'code': 500, 'message': f'Internal server error: {str(e)}'})

    return app


def process_leaderboard_data(data, tournament_id):
    """Process ESPN leaderboard data and store in database"""
    try:
        players_processed = 0
        rounds_processed = 0
        
        app.logger.info(f"Processing leaderboard data for tournament {tournament_id}")
        app.logger.debug(f"Data structure: {json.dumps(data, indent=2)[:1000]}...")
        
        # Check if tournament has competitions data (new ESPN API structure)
        if 'competitions' not in data or not data['competitions']:
            app.logger.warning("No competitions data found in ESPN response")
            return {
                'players_processed': players_processed,
                'rounds_processed': rounds_processed
            }
        
        competition = data['competitions'][0]
        
        # Update tournament status based on ESPN data
        tournament = db.LPGA_Tournament.get(id=tournament_id)
        if tournament and 'status' in data:
            status_info = data['status']
            if status_info.get('type', {}).get('completed', False):
                new_status = 'completed'
            elif status_info.get('type', {}).get('state') == 'post':
                new_status = 'completed'
            elif status_info.get('type', {}).get('state') == 'in':
                new_status = 'in_progress'
            else:
                new_status = 'scheduled'
            
            if tournament.status != new_status:
                tournament.update(status=new_status)
                app.logger.info(f"Updated tournament status to: {new_status}")
        
        # Process each player in the competitors list
        app.logger.debug(f"Checking for competitors in competition: {list(competition.keys())}")
        if 'competitors' in competition and competition['competitors']:
            competitors = competition['competitors']
            app.logger.info(f"Found {len(competitors)} competitors")
            
            for player_entry in competitors:
                try:
                    # Debug: Log first player entry structure
                    if players_processed == 0:
                        app.logger.debug(f"First player entry structure: {json.dumps(player_entry, indent=2)[:500]}...")
                    
                    # Extract player information
                    player_data = player_entry.get('athlete', {})
                    # Player ID is at the top level of competitor, not inside athlete
                    player_espn_id = player_entry.get('id')
                    player_name = player_data.get('fullName', 'Unknown Player')
                    
                    # Extract country from flag data
                    player_country = 'Unknown'
                    if 'flag' in player_data and 'alt' in player_data['flag']:
                        player_country = player_data['flag']['alt']
                    
                    if not player_espn_id:
                        continue
                    
                    # Create or get player record
                    player = db.LPGA_Player.get(espn_id=player_espn_id)
                    if not player:
                        player = db.LPGA_Player.new(
                            espn_id=player_espn_id,
                            name=player_name,
                            display_name=player_data.get('displayName', player_name),
                            short_name=player_data.get('shortName', player_name[:10]),
                            country=player_country,
                            country_flag_url=player_data.get('flag', {}).get('href')
                        )
                        app.logger.info(f"Created new player: {player_name}")
                    else:
                        # Update existing player with new information
                        player.update(
                            display_name=player_data.get('displayName', player_name),
                            short_name=player_data.get('shortName', player_name[:10]),
                            country=player_country,
                            country_flag_url=player_data.get('flag', {}).get('href')
                        )
                    
                    # Extract tournament performance data
                    position = player_entry.get('order')  # ESPN uses 'order' for position
                    total_score = player_entry.get('score')  # ESPN uses 'score' for total
                    
                    # Calculate total to par from score string
                    total_to_par = 0
                    if total_score:
                        if total_score == 'E':
                            total_to_par = 0
                        elif total_score.startswith('-'):
                            total_to_par = -int(total_score[1:])
                        elif total_score.startswith('+'):
                            total_to_par = int(total_score[1:])
                    
                    earnings = None  # ESPN doesn't provide earnings in this format
                    
                    # Create or update tournament player record
                    tournament_player = db.LPGA_TournamentPlayer.get(
                        tournament_id=tournament_id,
                        player_id=player.id
                    )
                    
                    if not tournament_player:
                        tournament_player = db.LPGA_TournamentPlayer.new(
                            tournament_id=tournament_id,
                            player_id=player.id,
                            position=position,
                            total_score=total_score,
                            total_to_par=total_to_par,
                            earnings=earnings
                        )
                        app.logger.info(f"Created tournament entry for {player_name}")
                    else:
                        tournament_player.update(
                            position=position,
                            total_score=total_score,
                            total_to_par=total_to_par,
                            earnings=earnings
                        )
                        app.logger.info(f"Updated tournament entry for {player_name}")
                    
                    players_processed += 1
                    
                    # Process round-by-round scores from linescores
                    linescores = player_entry.get('linescores', [])
                    app.logger.debug(f"Processing linescores for {player_name}: {len(linescores)} rounds")
                    if linescores:
                        app.logger.debug(f"First linescore structure: {json.dumps(linescores[0], indent=2)[:300]}...")
                    
                    for round_data in linescores:
                        round_number = round_data.get('period')
                        round_score = round_data.get('value')
                        round_to_par_str = round_data.get('displayValue', '0')
                        
                        # Calculate round to par from displayValue
                        round_to_par = 0
                        if round_to_par_str:
                            if round_to_par_str == 'E':
                                round_to_par = 0
                            elif round_to_par_str.startswith('-'):
                                round_to_par = -int(round_to_par_str[1:])
                            elif round_to_par_str.startswith('+'):
                                round_to_par = int(round_to_par_str[1:])
                        
                        round_position = position  # Use overall position for round position
                        
                        if round_number and round_score is not None:
                            # Extract completion time and statistics
                            completion_time = None
                            statistics_data = []
                            
                            if 'statistics' in round_data and round_data['statistics']:
                                for stat_category in round_data['statistics']:
                                    if isinstance(stat_category, dict) and 'categories' in stat_category and stat_category['categories']:
                                        for category in stat_category['categories']:
                                            if isinstance(category, dict) and 'stats' in category and category['stats']:
                                                for stat in category['stats']:
                                                    if isinstance(stat, dict):
                                                        if stat.get('displayValue') and 'PDT' in str(stat.get('displayValue')):
                                                            completion_time = stat.get('displayValue')
                                                        statistics_data.append({
                                                            'name': stat.get('name'),
                                                            'value': stat.get('value'),
                                                            'display_value': stat.get('displayValue')
                                                        })
                            
                            # Check if round already exists
                            existing_round = db.LPGA_Round.get(
                                tournament_id=tournament_id,
                                tournament_player_id=tournament_player.id,
                                round_number=round_number
                            )
                            
                            if not existing_round:
                                db.LPGA_Round.new(
                                    tournament_id=tournament_id,
                                    tournament_player_id=tournament_player.id,
                                    round_number=round_number,
                                    score=round_score,
                                    to_par=round_to_par,
                                    position=round_position,
                                    completion_time=completion_time,
                                    statistics=statistics_data if statistics_data else None
                                )
                                app.logger.info(f"Added round {round_number} for {player_name}: {round_score}")
                                rounds_processed += 1
                            else:
                                # Update existing round if scores changed
                                if existing_round.score != round_score:
                                    existing_round.update(
                                        score=round_score,
                                        to_par=round_to_par,
                                        position=round_position,
                                        completion_time=completion_time,
                                        statistics=statistics_data if statistics_data else None
                                    )
                                    app.logger.info(f"Updated round {round_number} for {player_name}: {round_score}")
                                    rounds_processed += 1
                
                except Exception as e:
                    app.logger.error(f"Error processing player entry: {e}")
                    continue
        
        # If no leaderboard data, check if tournament is scheduled
        elif tournament and tournament.status == 'scheduled':
            app.logger.info(f"Tournament {tournament.name} is scheduled but no leaderboard data available yet")
        
        app.logger.info(f"Processing complete: {players_processed} players, {rounds_processed} rounds")
        
        return {
            'players_processed': players_processed,
            'rounds_processed': rounds_processed
        }
        
            except Exception as e:
            app.logger.error(f"Error processing leaderboard data: {e}")
            raise e


if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 8585))
    host = os.environ.get('HOST', '0.0.0.0')
    debug = os.environ.get('FLASK_ENV') != 'production'
    
    app.run(
        threaded=True, 
        host=host, 
        port=port, 
        debug=debug
    )
