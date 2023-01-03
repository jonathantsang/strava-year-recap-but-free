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

// This gets the photos from the DETAILED activity from a separate api call
// Issues:
// 1. this probably leaks async threads since we exit early but it is better that than
// trying to get EVERY activity with a photo
// 2. this only pulls the MOST RECENT photos

// Solution?
// sort the activities by kudos_count which is n=800, O(800*log(800))
export const getPhotos = async (accessToken, activities, num_photos = 3, current_year = 2022) => {
    // Sort activities and hope it doesn't need ordering later on :D
    activities.data.sort(function(a,b){ return b["kudos_count"] - a["kudos_count"]});

    const urls = []
    for(var i = 0; i < activities.data.length; i++) {
        // Only need num_photos number of photos
        if (urls.length >= num_photos) {
            break;
        } else {
            const activity = activities.data[i];
            const date = new Date(activity["start_date_local"]);
            // Find true strava photos
            if (activity["total_photo_count"] - activity["photo_count"] && date.getFullYear() === current_year) {
                var detailed_activity = await getDetailedActivity(accessToken, activity["id"], urls);
                detailed_activity = detailed_activity.data;
                // Do the split on ? since videos use prepended args and then we put more in the image list for the year collage and it messes it up
                urls.push([detailed_activity["name"], date.toDateString(), detailed_activity["photos"]["primary"]["urls"][600].split("?")[0]]);
            }
        }
    }
    return urls;
}
