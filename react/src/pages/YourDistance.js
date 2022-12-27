import React from "react";
import { connect } from "react-redux";

const YourDistance = ({ user, athlete, activities, returnTokens }) => {
    console.log(activities)
    return (
        <div>
            <img src={athlete.data.profile_medium} alt="profile"/>
            <p>Athlete Id: {athlete.data.id}</p>
            <h1>Hi, {returnTokens.athlete.firstname}!</h1>
            <h2>Total run distance: {user.data.all_run_totals.distance} m</h2>
            <h2>Total ride distance: {user.data.all_ride_totals.distance} m</h2>
            <h2>Total swim distance: {user.data.all_swim_totals.distance} m</h2>
            <h2>Most recent activity: {activities.data[0].name}</h2>
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
