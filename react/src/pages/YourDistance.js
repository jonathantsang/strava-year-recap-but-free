import React from "react";
import { connect } from "react-redux";

const YourDistance = ({ user, athlete, activities, returnTokens }) => {
    console.log(activities)
    return (
        <div>
            <img src={athlete.data.profile_medium} alt="profile"/>
            <p>Athlete Id: {athlete.data.id}</p>
            <h1>Hi, {returnTokens.athlete.firstname}!</h1>

            <h1>Strava year in review but free</h1>

            <h1>Page 1 - Total days active</h1>
            <h2>Total days active: ???</h2>
            <h2>Total run distance: {user.data.all_run_totals.distance} m</h2>
            <h2>Total ride distance: {user.data.all_ride_totals.distance} m</h2>
            <h2>Total swim distance: {user.data.all_swim_totals.distance} m</h2>

            <h1>Page 2 - Fastest and longest activity</h1>
            <h2>Biggest ride distance: {user.data.biggest_ride_distance}</h2>
            <h2>Biggest climb elevation gain: {user.data.biggest_climb_elevation_gain}</h2>

            <h1>Page 3 - Kudos, Local legend and segment effort records</h1>

            <h2>You got "xyz" kudos on your activities in 2022</h2>
            <h2>Finding how many kudos you gave out is impossible from Strava's current API</h2>

            <h1>Page 4 - Total elevation and total distance</h1>

            <h1>Page 5 - Top photos</h1>

            <h1>Page 6 - 2022 Totals</h1>

            <h1>Custom data</h1>

            <button type="button">
                Download as Image
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        athlete: state.athlete,
        activities: state.activities,
        returnTokens: state.returnTokens,
    };
};

export default connect(mapStateToProps)(YourDistance);
