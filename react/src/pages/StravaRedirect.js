import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import _ from "lodash";
import { connect } from "react-redux";

import { setUser, setUserActivities, setAthlete, setActivities } from "../actions";
import {
    cleanUpAuthToken,
    testAuthGetter,
    getAthleteStats,
    getAthlete,
    getActivities,
    getPhotos,
} from "../utils/functions";

class StravaRedirect extends React.Component {
    componentDidMount() {
        const authenticate = async () => {
            const { history, location } = this.props;
            try {
                // If not redirected to Strava, return to home
                if (_.isEmpty(location)) {
                    return history.push("/");
                }

                // Save the Auth Token to the Store (it's located under 'search' for some reason)
                const stravaAuthToken = cleanUpAuthToken(location.search);

                // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
                const tokens = await testAuthGetter(stravaAuthToken);
                this.props.setUser(tokens);
                const accessToken = tokens.access_token;
                const userID = tokens.athlete.id;

                // Axios request to get users info
                const user = await getAthleteStats(userID, accessToken);
                const athlete = await getAthlete(accessToken);

                // testing
                const pagination_amount = 200;

                // User might have more than 200 activities in a year
                // Paginate a max of 800 activities
                // if you have more, unfortunately due to rate limits I'm not going to
                // analyze them

                // CHANGE TO 2000 activities to get old PRs?
                const activities = await getActivities(accessToken, pagination_amount, 1);
                const page2 = await getActivities(accessToken, pagination_amount, 2);
                const page3 = await getActivities(accessToken, pagination_amount, 3);
                const page4 = await getActivities(accessToken, pagination_amount, 4);

                // Maybe change numPhotos > 3? and current year = 2022
                const photos = await getPhotos(accessToken, activities, 3, 2022);

                this.props.setUserActivities(user);
                this.props.setAthlete(athlete);
                this.props.setActivities(activities, page2, page3, page4, photos, accessToken);

                // Once complete, go to display page
                history.push("/yourdistance");
            } catch (error) {
                history.push("/");
            }
        };
        authenticate();
    }

    render() {
        return <div>
                <CircularProgress />
                <p>Loading...Please wait as it analyzes your Strava activities.</p>
                </div>;
    }
}

const mapStateToProps = (state) => {
    return { authTokenURL: state.authTokenURL };
};

export default connect(mapStateToProps, {
    setUserActivities,
    setUser,
    setAthlete,
    setActivities,
})(StravaRedirect);
