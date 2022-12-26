import json
import os
import requests
import time

# Read the token from the saved file
with open('strava_token.json', 'r') as token:
  data = json.load(token)

# Initial Settings
client_id = '99074'
client_secret = '4d6a1697ddafa8cd34c053c2db8cfb9fc68d75d9'
redirect_uri = 'http://localhost/'

# Get the access token
access_token = data['access_token']

max_pagination = 200

# Build the API url to get activities data
activities_url = f"https://www.strava.com/api/v3/athlete/activities?" \
          f"access_token={access_token}"
