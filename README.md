# strava-year-recap-but-free

This is against their API TOS:

Check it out here:
[https://strava-year-recap-but-free-x7xf.vercel.app/](https://strava-year-recap-but-free-x7xf.vercel.app/)

Strava year in review has:
- 2 useless panels
- total days active showing top sports
- total days active (with %)
- fastest activities, longest activities
- how many kudos given and received, local legends segments and segment records
- total elevation and total distance
- top photos of the year
- 2022 totals

Resources:
- https://www.grace-dev.com/python-apis/strava-api/
- https://github.com/dunleavyjack/Strava-OAuth2-Test

## Running Locally

**WARNING:** THIS DOES NOT CURRENTLY USE ALL ACTIVITIES. It gives incomplete year in review stats. I capped it at a certain amount so I don't get rate limited by Strava's API. If you want to risk it all and test a much slower version go to StravaRedirect.js and change `const pagination_amount = 5` to `200`. Beware the app may not work if you do this, it will DEFINITELY run much slower, and may even use too many API calls trying to run the app.

1. Run `npm install` in the react directory to install deps

2. Run `npm start` to start the server at localhost:3000

3. Go to `localhost:3000` and click "Connect with Strava"

![Alt text](assets/home.png)

4. Login with Strava (authorize all the data)

![Alt text](assets/strava_login.png)

5. If it loads correctly the stats should be in the redirect link of localhost:3000/yourdistance

![Alt text](assets/stats_example.png)
