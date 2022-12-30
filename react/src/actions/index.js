function metreToMiles(amount) {
    return Math.round(amount / 1609); // approximate
}

function metreToFeet(amount) {
    return Math.round(amount * 3.281); // approximate
}

export const setUserActivities = (data) => {
    data.data.ytd_run_totals.distance = metreToMiles(data.data.ytd_run_totals.distance);
    data.data.ytd_ride_totals.distance = metreToMiles(data.data.ytd_ride_totals.distance);
    data.data.ytd_swim_totals.distance = metreToMiles(data.data.ytd_swim_totals.distance);

    return {
        type: "SET_USER_ACTIVITIES",
        payload: data,
    };
};

// This is for the token
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
function goThroughActivities(activities, photos, current_year = 2022) {
    const dates_map = new Map();
    const hours_map = new Map();
    const sport_type_map = new Map();
    var total_kudos = 0; // calculates total kudos received
    var total_elevation = 0; // total elevation from activities. Strava is vague so I count run + bike in total
    var total_distance = 0; // total distance from activities (all sportTypes)
    // Store the longest/largest elevation ride here
    var longest_ride = null;
    var biggest_climb_ride = null;

    // Top kudos activity for photos
    // Want top 3, but for now we get 3 most recent with photos
    var activities_with_photos_ids = photos

    // We do a bunch of stuff in one loop to save on loop computations because we potentially go through up to 800 activities
    for (const activity of activities) {
        const date = new Date(activity["start_date_local"]);

        // Only count current year in "year in review"
        if (date.getFullYear() === current_year) {

            // Increment dates with an activity
            dates_map.set(date, dates_map.get(date) === undefined ? 1 : dates_map.get(date) + 1);

            // Increment hour of day an activity was done
            hours_map.set(date.getHours(), hours_map.get(date.getHours()) === undefined ? 1 : hours_map.get(date.getHours()) + 1);

            total_kudos += activity["kudos_count"];

            total_elevation += activity["total_elevation_gain"];

            total_distance += activity["distance"];

            sport_type_map.set(activity["sport_type"], sport_type_map.get(activity["sport_type"]) === undefined ? 1 : sport_type_map.get(activity["sport_type"]) + 1);

            // Use enum values "MountainBikeRide" or "Ride" (no EBikes)
            if (activity["sport_type"] === "MountainBikeRide" || activity["sport_type"] === "Ride") {
                if (longest_ride == null || longest_ride.distance < activity.distance) {
                    longest_ride = activity;
                }
                if (biggest_climb_ride == null || biggest_climb_ride.total_elevation_gain < activity.total_elevation_gain) {
                    biggest_climb_ride = activity;
                }
            }
        }
    }

    var highest_sport_type_count = [null,0];
    sport_type_map.forEach (function(value, key) {
        if (value > highest_sport_type_count[1]) {
            highest_sport_type_count = [value, key]
        }
    })

    const total_days_active = getTotalDaysActive(dates_map, current_year);
    const days_active_percentage = getTotalDaysActivePercentage(total_days_active);

    return [
        dates_map,
        total_days_active,
        total_kudos,
        metreToMiles(total_distance),
        metreToFeet(total_elevation),
        highest_sport_type_count,
        longest_ride === null ? longest_ride : [longest_ride.name, new Date(longest_ride.start_date).toDateString(), metreToMiles(longest_ride.distance)], // may be null if no rides
        biggest_climb_ride === null ? biggest_climb_ride : [biggest_climb_ride.name, new Date(longest_ride.start_date).toDateString(), metreToFeet(biggest_climb_ride.total_elevation_gain)],  // may be null if no rides
        activities_with_photos_ids,
        days_active_percentage
    ];
}

// Get the total days active in current_year by going through and counting them manually
function getTotalDaysActive(dates_map, current_year = 2022) {
    const year_days = new Set();
    dates_map.forEach (function(value, key) {
        if (key.getFullYear() === current_year) {
            year_days.add(key.getMonth() + '/' + key.getDate());
        }
    });
    console.log(year_days);
    return year_days.size;
}

// TODO
function getTotalDaysActivePercentage(total_days_active) {
    // Interpolation of a regular distribution and trying to extrapolate with real data but
    // also holding other stuff constant

    // 309 is 1% (me)

    // For testing we are PURELY going to guess
    // Ideally we do some distribution curve but we are short on time
    // 365-309 is 1%
    // 309-290 is 2%
    // 290-280 is 3%
    // 280-270 is 4%
    // 270-260 is 5%
    // 260-200 is 10%
    // 200-100 is 50%
    // rest is top 100% lmao

    if (total_days_active >= 309) {
        return 1;
    } else if (total_days_active >= 290) {
        return 2;
    } else if (total_days_active >= 280) {
        return 3;
    } else if (total_days_active >= 270) {
        return 4;
    } else if (total_days_active >= 260) {
        return 5;
    } else if (total_days_active >= 200) {
        return 10;
    } else if (total_days_active >= 100) {
        return 50;
    } else {
        return 100;
    }
}

export const setActivities = (data, page2 = [], page3 = [], page4 = [], photos = [], accessToken) => {
    // Pages have data in them
    var activities = data.data
    if (page2 != null && page2.data.length > 0) {
        activities = activities.concat(page2.data)
    }
    if (page3 != null && page3.data.length > 0) {
        activities = activities.concat(page3.data)
    }

    const current_year = 2022
    var final_data = goThroughActivities(activities, photos, current_year);

    return {
        type: "SET_ACTIVITIES",
        payload: final_data
    }
}
