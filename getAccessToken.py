import json
import os
import requests
import time

# Initial Settings
client_id = '99074'
client_secret = '4d6a1697ddafa8cd34c053c2db8cfb9fc68d75d9'
redirect_uri = 'http://localhost/'

# Authorization URL
request_url = f'http://www.strava.com/oauth/authorize?client_id={client_id}' \
                  f'&response_type=code&redirect_uri={redirect_uri}' \
                  f'&approval_prompt=force' \
                  f'&scope=profile:read_all,activity:read_all'

# User prompt showing the Authorization URL
# and asks for the code
print('Click here:', request_url)
print('Please authorize the app and copy&paste below the generated code!')
print('P.S: you can find the code in the URL')
code = input('Insert the code from the url: ')

# Get the access token
token = requests.post(url='https://www.strava.com/oauth/token',
                       data={'client_id': client_id,
                             'client_secret': client_secret,
                             'code': code,
                             'grant_type': 'authorization_code'})

print(token)

#Save json response as a variable
strava_token = token.json()

with open('strava_token.json', 'w') as outfile:
  json.dump(strava_token, outfile)
