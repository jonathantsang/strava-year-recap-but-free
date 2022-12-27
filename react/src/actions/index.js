export const setUserActivities = (data) => {
    return {
        type: "SET_USER_ACTIVITIES",
        payload: data,
    };
};

export const setUser = (data) => {
    return {
        type: "SET_USER",
        payload: data,
    };
};

export const setAthlete = (data) => {
    return {
        type: "SET_ATHLETE",
        payload: data
  }
}

// Goes through the activities for analyzing data
// dates_map: key: Date object -> number of activities with that date (this is kind of useless, might change it)
// hours_map: key: int object for hour (1-23) -> number of activities with that hour
function goThroughActivities(activities, current_year = 2022) {
    const dates_map = new Map();
    const hours_map = new Map();
    const sport_type_map = new Map();
    var total_kudos = 0; // calculates total kudos received
    var total_elevation = 0; // total elevation from activities. Strava is vague so I count run + bike in total

    // We do a bunch of stuff in one loop to save on loop computations because we potentially go through up to 800 activities
    for (const activity of activities) {
        const date = new Date(activity["start_date_local"]);

        // Increment dates with an activity
        dates_map.set(date, dates_map.get(date) === undefined ? 1 : dates_map.get(date) + 1);

        // Increment hour of day an activity was done
        hours_map.set(date.getHours(), hours_map.get(date.getHours()) === undefined ? 1 : hours_map.get(date.getHours()) + 1);

        total_kudos += activity["kudos_count"];

        total_elevation += activity["total_elevation_gain"];

        sport_type_map.set(activity["sport_type"], sport_type_map.get(activity["sport_type"] === undefined ? 1 : sport_type_map.get(activity["sport_type"]) + 1))
    }

    const days_active = getTotalDaysActive(dates_map, current_year);

    return [dates_map, hours_map, days_active, total_kudos, total_elevation, sport_type_map];
}

// Get the total days active in current_year by going through and counting them manually
function getTotalDaysActive(dates_map, current_year = 2022) {
    const year_days = new Set();
    dates_map.forEach (function(value, key) {
        if (key.getFullYear() === current_year) {
            year_days.add(key.getMonth() + '/' + key.getDate());
        }
    });
    return year_days.size;
}

export const setActivities = (data, page2 = [], page3 = [], page4 = []) => {
    // Pages have data in them
    var activities = data.data
    if (page2 != null && page2.data.length > 0) {
        activities = activities.concat(page2.data)
    }
    if (page3 != null && page3.data.length > 0) {
        activities = activities.concat(page3.data)
    }

    const current_year = 2022
    var final_data = goThroughActivities(activities, current_year);

    return {
        type: "SET_ACTIVITIES",
        payload: final_data
    }
}
