import json
import os
import requests
import time

# Read the token from the saved file
with open('strava_token.json', 'r') as token:
  data = json.load(token)

# Get the access token
access_token = data['access_token']

# Build the API url to get athlete info
athlete_url = f"https://www.strava.com/api/v3/athlete?" \
              f"access_token={access_token}"

# Get the response in json format
response = requests.get(athlete_url)
athlete = response.json()
id = athlete["id"]

# Athlete Stats
athlete_stats_url = f"https://www.strava.com/api/v3/athletes/{id}/stats?" \
              f"access_token={access_token}"

response = requests.get(athlete_stats_url)
athlete_stats = response.json()

run_days, ride_days, swim_days = athlete_stats["ytd_ride_totals"]["count"], athlete_stats["ytd_run_totals"]["count"], athlete_stats["ytd_swim_totals"]["count"]

print(f'This year you ran {run_days} times')
print(f'This year you rode {ride_days} times')
print(f'This year you swam {swim_days} times')
