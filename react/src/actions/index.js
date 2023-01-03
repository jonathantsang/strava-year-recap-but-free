import { metreToMiles, metreToFeet, stringToColour } from './utilities';
import { convertMonthMap,
         getHighestSportTypeCounts,
         getTopActivityTimeOfDay,
         getTotalDaysActive,
         getTotalDaysActivePercentage,
         saveBestEffortsRun,
         getBestEffortRunList,
         getTimeOfDayBucket } from "./time_and_date";
import { getArchetypeData } from "./archetype";

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

function getActivityBreakdownMap(highest_sport_type_counts, total_year_activities) {
    var res = [];
    var pie_rest_amount = 100;
    highest_sport_type_counts.slice(0,4).forEach (function(item, index, arr) {
        const value = item[0] / total_year_activities * 100;
        pie_rest_amount -= Math.round(value);
        res.push({argument: item[1] + " " + Math.round(value) + "%", value: Math.round(value)});
    });
    res.push({argument: "Other", value: Math.round(pie_rest_amount)})
    return res;
}

function getPhotosUrls(photos) {
    const photos_urls_list = [];
    photos.forEach( function(item, index, arr) {
        photos_urls_list.push({src: item[2], title: item[0]})
    });
    return photos_urls_list;
}

// Goes through the activities for analyzing data
// dates_map: key: Date object -> number of activities with that date (this is kind of useless, might change it)
// hours_map: key: int object for hour (1-23) -> number of activities with that hour
function goThroughActivities(activities, photos, current_year = 2022) {
    const dates_map = new Map();
    const hours_map = new Map();
    const month_map = new Map();
    const sport_type_map = new Map(); // each has a set with times for calculating archetype
    const best_effort_run_map = new Map();

    let total_kudos = 0; // calculates total kudos received
    let total_elevation = 0; // total elevation from activities. Strava is vague so I count run + bike in total
    let total_distance = 0; // total distance from activities (all sportTypes)
    let total_year_activities = 0;

    // Store the longest/largest elevation ride here
    let longest_ride = null;
    let biggest_climb_ride = null;
    let athlete_count_count = []; // [solo, group]

    // Not sure about PRs and achievements overlapping
    let pr_count = 0;
    let achievement_count = 0;

    // Needed in archetype data
    const sport_time_group = new Map();

    // Top kudos activity for photos?
    var activities_with_photos_ids = photos

    const photos_urls = getPhotosUrls(photos);

    // We do a bunch of stuff in one loop to save on loop computations because we potentially go through up to 800 activities
    for (const activity of activities) {
        const date = new Date(activity["start_date_local"]);

        // Only count current year in "year in review"
        if (date.getFullYear() === current_year) {
            total_year_activities += 1;

            // Increment dates with an activity
            dates_map.set(date, dates_map.get(date) === undefined ? 1 : dates_map.get(date) + 1);

            // Increment month with an activity
            month_map.set(date.getMonth(), month_map.get(date.getMonth()) === undefined ? 1 : month_map.get(date.getMonth()) + 1);

            // Increment hour of day an activity was done
            hours_map.set(date.getHours(), hours_map.get(date.getHours()) === undefined ? 1 : hours_map.get(date.getHours()) + 1);

            total_kudos += activity["kudos_count"];

            if (activity["athlete_count"] === 1) {
                athlete_count_count[0] += 1
            } else {
                athlete_count_count[1] += 1
            }

            // Hash a key with sport type, time of day, and solo or group
            const time_of_day_bucket = getTimeOfDayBucket(date.getHours());
            const solo_or_group_key = activity["athlete_count"] === 1 ? "solo" : "group";
            const archetype_key = activity["sport_type"] + "/" + time_of_day_bucket + "/" + solo_or_group_key;
            sport_time_group.set(archetype_key, sport_time_group.get(archetype_key) === undefined ? 1 : sport_time_group.get(archetype_key) + 1);

            // find best 5k, 10k, half marathon, and marathon effort
            // use distance (given in m)
            // use moving_time (given in seconds)
            saveBestEffortsRun(best_effort_run_map, activity);

            // Remove actvities with a ski lift and messes up elevation
            if (activity["sport_type"].includes("Ski") === false && activity["sport_type"].includes("Snowboard") === false) {
                total_elevation += activity["total_elevation_gain"];
            }

            total_distance += activity["distance"];

            pr_count += activity["pr_count"];

            achievement_count += activity["achievement_count"];

            // sport_type_map.set(activity["sport_type"], sport_type_map.get(activity["sport_type"]) === undefined ? 1 : sport_type_map.get(activity["sport_type"]) + 1);
            if (sport_type_map.has(activity["sport_type"]) === false) {
                sport_type_map.set(activity["sport_type"], new Set());
            }
            sport_type_map.get(activity["sport_type"]).add(date);

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

    convertMonthMap(month_map, current_year);

    // SportType, amount
    const highest_sport_type_counts = getHighestSportTypeCounts(sport_type_map);

    // annoying
    const activity_breakdown_map = getActivityBreakdownMap(highest_sport_type_counts, total_year_activities);

    // Most popular time of day
    const top_activity_time_of_day = getTopActivityTimeOfDay(hours_map);

    // archetype
    const archetype_data = getArchetypeData(highest_sport_type_counts, total_year_activities, athlete_count_count, top_activity_time_of_day, total_kudos, sport_time_group);
    const archetype_colour = stringToColour(archetype_data[1]);

    const total_days_active = getTotalDaysActive(dates_map, current_year);
    const days_active_percentage = getTotalDaysActivePercentage(total_days_active);

    const best_effort_run_list = getBestEffortRunList(best_effort_run_map);

    // I hate this
    return [
        dates_map,
        total_days_active,
        total_kudos,
        metreToMiles(total_distance),
        metreToFeet(total_elevation),
        highest_sport_type_counts,
        longest_ride === null ? longest_ride : [longest_ride.name, new Date(longest_ride.start_date).toDateString(), metreToMiles(longest_ride.distance)], // may be null if no rides
        biggest_climb_ride === null ? biggest_climb_ride : [biggest_climb_ride.name, new Date(longest_ride.start_date).toDateString(), metreToFeet(biggest_climb_ride.total_elevation_gain)],  // may be null if no rides
        activities_with_photos_ids,
        days_active_percentage,
        month_map,
        pr_count,
        achievement_count,
        top_activity_time_of_day,
        total_year_activities,
        archetype_data,
        archetype_colour,
        current_year,
        activity_breakdown_map,
        best_effort_run_list,
        photos_urls,
    ];
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
    if (page4 != null && page4.data.length > 0) {
        activities = activities.concat(page4.data)
    }

    const current_year = 2022
    var final_data = goThroughActivities(activities, photos, current_year);

    return {
        type: "SET_ACTIVITIES",
        payload: final_data
    }
}
