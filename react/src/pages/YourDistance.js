import React from "react";
import { connect } from "react-redux";
import { TotalsCard, TopPercentCard, TopPhotosCard, TotalDaysActiveCard, AchievementsCard } from "./components/Cards";
import { HireMe } from "./components/Extras";
import { ActivityBreakdownCard } from "./components/cards/ActivityBreakdownCard";
import { StravaArchetypeCard } from "./components/cards/StravaArchetypeCard";
import { PRCard } from "./components/cards/PRCard";

const YourDistance = ({ user, athlete, activities, returnTokens }) => {
    console.log(activities);
    // console.log(returnTokens); // accessToken
    return (
        <div>
            <HireMe />

            <PRCard current_year={activities[17]}
                    part_one_title={activities[19][0][1]}
                    part_one_description={activities[19][0][0]["name"]}
                    part_one_after={activities[19][0][2]}
                    part_two_title={activities[19][1][1]}
                    part_two_description={activities[19][1][0]["name"]}
                    part_two_after={activities[19][1][2]}
                    part_three_title={activities[19][2][1]}
                    part_three_description={activities[19][2][0]["name"]}
                    part_three_after={activities[19][2][2]}/>
            <br />

            <ActivityBreakdownCard data={activities[18]}/>

            <br />

            <StravaArchetypeCard activity_score={activities[9]}
                                 time_of_day={activities[13]}
                                 kudos={activities[2]}
                                 sport_one={activities[5][0][0]/activities[14]*100}
                                 sport_one_name={activities[5][0][1]}
                                 sport_two={activities[5][1][0]/activities[14]*100}
                                 sport_two_name={activities[5][1][1]}
                                 sport_three={activities[5][2][0]/activities[14]*100}
                                 sport_three_name={activities[5][2][1]}
                                 strava_archetype={activities[15][0]}
                                 strava_archetype_description={activities[15][1]}
                                 strava_archetype_colour={activities[16]}
                                 current_year={activities[17]}
                                 top_sport_type={activities[5][0][1]}
                                 />

            <br />

            <TopPercentCard top_percentage={activities[9]}
                            current_year = {activities[17]}/>

            <br />

            <TotalsCard days_active={activities[1]}
                        total_elevation={activities[4]}
                        total_distance={activities[3]}
                        first_name={returnTokens.athlete.firstname}
                        last_name= {returnTokens.athlete.lastname}
                        avatar_src={returnTokens.athlete.profile}
                        top_sport_type={activities[5][0][1]}
                        current_year = {activities[17]}/>

            <br />

            <TotalDaysActiveCard days_active={activities[1]}
                                 top_sport_types={activities[5]}
                                 jan={activities[10].get(0)}
                                 feb={activities[10].get(1)}
                                 mar={activities[10].get(2)}
                                 apr={activities[10].get(3)}
                                 may={activities[10].get(4)}
                                 jun={activities[10].get(5)}
                                 jul={activities[10].get(6)}
                                 aug={activities[10].get(7)}
                                 sep={activities[10].get(8)}
                                 oct={activities[10].get(9)}
                                 nov={activities[10].get(10)}
                                 dec={activities[10].get(11)}
                                 current_year = {activities[17]}/>

            <br />

            <AchievementsCard kudos_received={activities[2].toLocaleString()}
                              local_legends="N/A"
                              personal_records="N/A"
                              current_year = {activities[17]} />

            <br />

            <TopPhotosCard activity_one_date={activities[8].length > 0 && activities[8][0][1]}
                           activity_one_title={activities[8].length > 0 && activities[8][0][0]}
                           activity_one_src={activities[8].length > 0 && activities[8][0][2]}
                           activity_two_date={activities[8].length > 1 && activities[8][1][1]}
                           activity_two_title={activities[8].length > 1 && activities[8][1][0]}
                           activity_two_src={activities[8].length > 1 && activities[8][1][2]}
                           activity_three_date={activities[8].length > 2 && activities[8][2][1]}
                           activity_three_title={activities[8].length > 2 && activities[8][2][0]}
                           activity_three_src={activities[8].length > 2 && activities[8][2][2]}
                           current_year = {activities[17]}/>

            <br />

            <h1>Your raw Strava data for {activities[17]}</h1>
            <img src={athlete.data.profile_medium} alt="profile"/>
            <p>Athlete Id: {athlete.data.id}</p>
            <h1>Hi, {returnTokens.athlete.firstname}!</h1>

            <h1>Strava year in review but free - text version</h1>

            <h1>Page 1 - Total days active in 2022</h1>
            <p>Total days active: {activities[2]}</p>

            <h1>Page 2 - Fastest and longest activity</h1>

            <h2>Longest ride distance ride:</h2>
            <p>{activities[6][0]} going {activities[6][2].toLocaleString()} miles on {activities[6][1]}</p>

            <h2>Biggest climb elevation gain:</h2>
            <p>{activities[7][0]} climbing {activities[7][2].toLocaleString()} feet on {activities[7][1]}</p>

            <h1>Page 3 - Kudos, Local legend and segment effort records</h1>

            <p>Local legend and segment efforts are not available to non-subscribers in the Strava API :(</p>
            <p>Even for subscribers checking segment efforts on activities is tedious and frankly not worth it in my opinion.</p>
            <p>Coupled with the fact that a PR may be set on a segment on multiple different activities.</p>

            <p>You got {activities[2].toLocaleString()} kudos on your activities in 2022</p>
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

            <p>Total days active: {activities[2]}</p>
            <p>You went a total elevation of {activities[4].toLocaleString()} miles</p>
            <p>You went a total distance of {activities[3].toLocaleString()} miles</p>
            <p>Your top sport was {activities[5][0][1]}</p>

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
