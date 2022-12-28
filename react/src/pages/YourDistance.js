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

            <h1>Page 1 - Total days active in 2022</h1>
            <p>Total days active: {activities[2]}</p>
            <p>Total run distance: {user.data.ytd_run_totals.distance} miles</p>
            <p>Total ride distance: {user.data.ytd_ride_totals.distance} miles</p>
            <p>Total swim distance: {user.data.ytd_swim_totals.distance} miles</p>

            <h1>Page 2 - Fastest and longest activity</h1>

            <h2>Longest ride distance ride:</h2>
            <p>{activities[6][0]} going {activities[6][2]} miles on {activities[6][1]}</p>

            <h2>Biggest climb elevation gain:</h2>
            <p>{activities[7][0]} climbing {activities[7][2]} feet on {activities[7][1]}</p>

            <h1>Page 3 - Kudos, Local legend and segment effort records</h1>

            <p>You got {activities[3]} kudos on your activities in 2022</p>
            <p>Finding how many kudos you gave out is impossible from Strava's current API</p>

            <h1>Page 4 - Total elevation and total distance</h1>
            <p>You went a total elevation of {activities[4]} miles</p>
            <p>You went a total distance of {activities[3]} miles</p>

            <h1>Page 5 - Top photos</h1>

            <h2>This is completely arbitrary and on different runs of Strava year in sport it gives different photos here</h2>
            <h2>That behaviour is replicated here:</h2>

            <img src=""/>

            <img src=""/>

            <img src=""/>

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
