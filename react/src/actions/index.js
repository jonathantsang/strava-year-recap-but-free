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

function getDateMaps(activities) {
    const dates_map = new Map()
    const hours_map = new Map()

    for (const activity of activities) {
        const date = new Date(activity["start_date_local"]);

        // Increment dates with an activity
        dates_map.set(date, dates_map.get(date) === undefined ? 1 : dates_map.get(date) + 1);

        // Increment hour of day an activity was done
        hours_map.set(date.getHours(), hours_map.get(date.getHours()) === undefined ? 1 : hours_map.get(date.getHours()) + 1);
    }

    console.log(dates_map);
    console.log(hours_map);
    return [dates_map, hours_map];
}

function getTotalDaysActive(dates_map, current_year = 2022) {
    const year_days = new Set();
    dates_map.forEach (function(value, key) {
        if (key.getFullYear === current_year) {
            year_days.add(key.getMonth() + '/' + key.getDate());
        }
    });
    return year_days.length();

}

export const setActivities = (data, page2 = [], page3 = [], page4 = []) => {
    // Pages have data in them
    const activities = data.data
    if (page2 != null && page2.data.length > 0) {
        activities.concat(page2.data)
    }
    if (page3 != null && page3.data.length > 0) {
        activities.concat(page3.data)
    }

    var date_maps = getDateMaps(activities);

    const days_active = getTotalDaysActive(date_maps[0]);
    date_maps.append(days_active);

    return {
        type: "SET_ACTIVITIES",
        payload: date_maps
    }
}
