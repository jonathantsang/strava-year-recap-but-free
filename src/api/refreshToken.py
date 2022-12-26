import json
import os
import requests
import time

# If access_token has expired then
# use the refresh_token to get the new access_token
with open('strava_token.json', 'r') as token:
  data = json.load(token)

if data['expires_at'] < time.time():
  token = requests.post(url='https://www.strava.com/api/v3/oauth/token',
                             data={'client_id': client_id,
                                   'client_secret': client_secret,
                                   'grant_type': 'refresh_token',
                                   'refresh_token': data['refresh_token']})


  # Let's save the new token
  strava_token = token.json()

with open('strava_token.json', 'w') as outfile:
  json.dump(strava_token, outfile)
