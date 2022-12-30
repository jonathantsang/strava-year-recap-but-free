import React from "react";
import { connect } from "react-redux";
import { TotalsCard, TotalDaysActiveCard, TopPhotosCard, HireMe } from "./components/Components";

const YourDistance = ({ user, athlete, activities, returnTokens }) => {
    // console.log(activities);
    // console.log(returnTokens); accessToken
    return (
        <div>
            <HireMe />

            <TopPhotosCard activity_one_date={activities[8].length > 0 && activities[8][0][1]}
                           activity_one_title={activities[8].length > 0 && activities[8][0][0]}
                           activity_one_src={activities[8].length > 0 && activities[8][0][2]}
                           activity_two_date={activities[8].length > 1 && activities[8][1][1]}
                           activity_two_title={activities[8].length > 1 && activities[8][1][0]}
                           activity_two_src={activities[8].length > 1 && activities[8][1][2]}
                           activity_three_date={activities[8].length > 2 && activities[8][2][1]}
                           activity_three_title={activities[8].length > 2 && activities[8][2][0]}
                           activity_three_src={activities[8].length > 2 && activities[8][2][2]} />

            <br />

            <TotalDaysActiveCard top_percentage={activities[9]}/>

            <br />

            <TotalsCard days_active={activities[1]}
                        total_elevation={activities[4]}
                        total_distance={activities[3]}
                        first_name={returnTokens.athlete.firstname}
                        last_name= {returnTokens.athlete.lastname}
                        avatar_src={returnTokens.athlete.profile}
                        top_sport_type={activities[5]}/>

            <br />


            <h1>Some Raw Data</h1>
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
            <p>{activities[6][0]} going {activities[6][2].toLocaleString()} miles on {activities[6][1]}</p>

            <h2>Biggest climb elevation gain:</h2>
            <p>{activities[7][0]} climbing {activities[7][2].toLocaleString()} feet on {activities[7][1]}</p>

            <h1>Page 3 - Kudos, Local legend and segment effort records</h1>

            <p>You got {activities[3].toLocaleString()} kudos on your activities in 2022</p>
            <p>Finding how many kudos you gave out is impossible from Strava's current API</p>

            <h1>Page 4 - Total elevation and total distance</h1>
            <p>You went a total elevation of {activities[4].toLocaleString()} miles</p>
            <p>You went a total distance of {activities[3].toLocaleString()} miles</p>

            <h1>Page 5 - Top photos</h1>

            <h2>This is completely arbitrary and on different runs of Strava year in sport it gives different photos here</h2>
            <h2>That behaviour is replicated here:</h2>

            {activities[8].length > 0 &&
                <div>
                    <p>{activities[8][0][0]} on {activities[8][0][1]}</p>
                    <img src={activities[8][0][2]} alt="strava embed"/>
                </div>
            }

            {activities[8].length > 1 &&
                <div>
                    <p>{activities[8][1][0]} on {activities[8][1][1]}</p>
                    <img src={activities[8][1][2]} alt="strava embed"/>
                </div>
            }

            {activities[8].length > 2 &&
                <div>
                    <p>{activities[8][2][0]} on {activities[8][2][1]}</p>
                    <img src={activities[8][2][2]} alt="strava embed"/>
                </div>
            }

            <h1>Page 6 - 2022 Totals</h1>

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
