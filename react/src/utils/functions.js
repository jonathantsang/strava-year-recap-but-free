import axios from "axios";

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

export const getParamValues = (url) => {
    return url
        .slice(1)
        .split("&")
        .reduce((prev, curr) => {
            const [title, value] = curr.split("=");
            prev[title] = value;
            return prev;
        }, {});
};

export const cleanUpAuthToken = (str) => {
    return str.split("&")[1].slice(5);
};

export const testAuthGetter = async (authTok) => {
    const authType = "profile:read_all,activity:read_all";
    try {
        const response = await axios.post(
            `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&code=${authTok}&grant_type=authorization_code&scope=${authType}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAthleteStats = async (userID, accessToken) => {
    try {
        const response = await axios.get(
            `https://www.strava.com/api/v3/athletes/${userID}/stats`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getAthlete = async (accessToken) => {
    try {
        const response = await axios.get(
            `https://www.strava.com/api/v3/athlete`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getDetailedActivity = async (accessToken, id, urls) => {
    try {
        const response = await axios.get(
            `https://www.strava.com/api/v3/activities/${id}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getActivities = async (accessToken, per_page = 5, page = 1) => {
    try {
        const response = await axios.get(
            `https://www.strava.com/api/v3/athlete/activities?per_page=${per_page}&page=${page}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getPhotos = async (accessToken, activities) => {
    const urls = []
    for(var i = 0; i < activities.data.length; i++) {
        // Only need 3 photos
        if (urls.length >= 3) {
            break;
        } else {
            const activity = activities.data[i];
            const date = new Date(activity["start_date_local"]);
            // Find true strava photos
            if (activity["total_photo_count"] - activity["photo_count"]) {
                var detailed_activity = await getDetailedActivity(accessToken, activity["id"], urls);
                detailed_activity = detailed_activity.data;
                urls.push([detailed_activity["name"], date.toDateString(), detailed_activity["photos"]["primary"]["urls"][600]]);
                console.log(urls);
            }
        }
    }
    console.log("END", urls)
    return urls;

}
