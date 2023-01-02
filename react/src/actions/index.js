function metreToMiles(amount) {
    return Math.round(amount / 1609); // approximate
}

function metreToFeet(amount) {
    return Math.round(amount * 3.281); // approximate
}

var stringToColour = function(str) {
  var hash = 0;
  for (var j = 0; j < str.length; j++) {
    hash = str.charCodeAt(j) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}


// I like ... sport
const SportTypeEnumMap = new Map(Object.entries(
    {AlpineSki: "alpine skiing",
     BackcountrySki: "backcountry skiing",
     Canoeing: "canoeing",
     Crossfit: "crossfit",
     EBikeRide: "ebiking",
     Elliptical: "elliptical",
     EMountainBikeRide: "emountain biking",
     Golf: "golfing",
     GravelRide: "gravel riding",
     Handcycle: "handcycling",
     Hike: "hiking",
     IceSkate: "ice skating",
     InlineSkate: "inline skating",
     Kayaking: "kayaking",
     Kitesurf: "kite surfing",
     MountainBikeRide: "mountain biking",
     NordicSki: "nordic skiing",
     Ride: "biking",
     RockClimbing: "rock climbing",
     RollerSki: "roller skiing",
     Rowing: "rowing",
     Run: "running",
     Sail: "sailing",
     Skateboard: "skateboarding",
     Snowboard: "snowboarding",
     Snowshoe: "snowshoeing",
     Soccer: "playing soccer",
     StairStepper: "using the stairstepper",
     StandUpPaddling: "standup paddling",
     Surfing: "surfing",
     Swim: "swimming",
     TrailRun: "trail running",
     Velomobile: "using a velomobile",
     VirtualRide: "virtually biking",
     VirtualRun: "virtually running",
     Walk: "walking",
     WeightTraining: "weight training",
     Wheelchair: "using a wheel chair",
     Windsurf: "windsurfing",
     Workout: "working out",
     Yoga: "doing yoga"
    }
));

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

function getHighestSportTypeCounts(sport_type_map) {
    // Get top 3
    let highest_sport_type_counts = []; // [amount, sport_type]

    sport_type_map.forEach (function(value, key) {
        highest_sport_type_counts.push([value, key]);

        // sort each iteration
        // this is less efficient but based on fixed number of sport_type and it being length == 3 at max
        // I think it is fine for now
        // want max value at the front
        highest_sport_type_counts.sort(function(a, b){return b[0] - a[0]});
        if (highest_sport_type_counts.length >= 4) {
            highest_sport_type_counts.pop();
        }
    });

    highest_sport_type_counts.forEach (function(item, index, arr) {
        highest_sport_type_counts[index] = [highest_sport_type_counts[index][0], SportTypeEnumMap.get(highest_sport_type_counts[index][1])]
    });

    return highest_sport_type_counts;
}

function getArchetypeData(highest_sports_type_counts, total_year_activities, athlete_count_count, top_activity_time_of_day, total_kudos) {
    let sport_balance_text = "";
    let athlete_count_text = "";
    let time_of_day_text = "";
    let kudos_count_text = "";

    // Title
    let athlete_count_title_text = "";
    let time_of_day_title_text = ""
    let athlete_type_title_text = "Athlete";

    // See percentage of activities different by 0.15
    if (Math.abs(highest_sports_type_counts[0][0] / total_year_activities - highest_sports_type_counts[1][0] / total_year_activities) > 0.15) {
        sport_balance_text = "mainly like " + highest_sports_type_counts[0][1];
    } else {
        sport_balance_text = "balance between " + highest_sports_type_counts[0][1] + " and " + highest_sports_type_counts[1][1]
    }

    if (athlete_count_count[0] <= athlete_count_count[1]) {
        athlete_count_text = "you do a lot of your activities in a group!";
        athlete_count_title_text = "Group";
    } else {
        athlete_count_text = "most of the time your like doing activities on your own.";
        athlete_count_title_text = "Solo";
    }

    if (top_activity_time_of_day === 33) {
        time_of_day_text = "You must be a morning person because mornings are your most popular time of day.";
        time_of_day_title_text = "Morning";
    } else if (top_activity_time_of_day === 66) {
        time_of_day_text = "You get most activities done during the day.";
        time_of_day_title_text = "Midday";
    } else {
        time_of_day_text = "You get most activities done during the night.";
        time_of_day_title_text = "Night";
    }

    if (total_kudos >= 10000) {
        kudos_count_text = "You receive more kudos than the majority of Strava users.";
    } else if (total_kudos >= 1000) {
        kudos_count_text = "You receive a lot of kudos on each of your activities!";
    } else {
        kudos_count_text = "You receive a fair amount of kudos on each activity.";
    }

    // Title text
    if (highest_sports_type_counts[0][1].includes("run")) {
        athlete_type_title_text = "Runner";
    } else if (highest_sports_type_counts[0][1].includes("bike")) {
        athlete_type_title_text = "Biker";
    }

    let description = `You ${sport_balance_text} and ${athlete_count_text} ${time_of_day_text} ${kudos_count_text}`
    let title = `${athlete_count_title_text} ${time_of_day_title_text} ${athlete_type_title_text}`
    return [title, description]
}


// Goes through the activities for analyzing data
// dates_map: key: Date object -> number of activities with that date (this is kind of useless, might change it)
// hours_map: key: int object for hour (1-23) -> number of activities with that hour
function goThroughActivities(activities, photos, current_year = 2022) {
    const dates_map = new Map();
    const hours_map = new Map();
    const month_map = new Map();
    const sport_type_map = new Map();
    let total_kudos = 0; // calculates total kudos received
    let total_elevation = 0; // total elevation from activities. Strava is vague so I count run + bike in total
    let total_distance = 0; // total distance from activities (all sportTypes)
    // Store the longest/largest elevation ride here
    let longest_ride = null;
    let biggest_climb_ride = null;
    let total_year_activities = 0;
    let athlete_count_count = []; // [solo, group]

    // Not sure about PRs and achievements overlapping
    let pr_count = 0;
    let achievement_count = 0;

    // Top kudos activity for photos
    // Want top 3, but for now we get 3 most recent with photos
    var activities_with_photos_ids = photos

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


            total_elevation += activity["total_elevation_gain"];

            total_distance += activity["distance"];

            pr_count += activity["pr_count"];

            achievement_count += activity["achievement_count"];

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

    // SportType, amount
    const highest_sport_type_counts = getHighestSportTypeCounts(sport_type_map);

    // Most popular time of day
    const top_activity_time_of_day = getTopActivityTimeOfDay(hours_map);

    // archetype
    const archetype_data = getArchetypeData(highest_sport_type_counts, total_year_activities, athlete_count_count, top_activity_time_of_day, total_kudos);
    const archetype_colour = stringToColour(archetype_data[1]);

    // Make it easier and divide each month to get percentage for each month
    month_map.forEach (function(value, key) {
        // I hate this logic of how many days are in a month
        if (key <= 6) {
            if (key === 1) { // February
                // leap year?
                if (current_year % 4 === 0) {
                    value /= 29;
                } else {
                    value /= 28;
                }
            } else if (key % 2 === 1) { // April, May, July etc.
                value /= 30;
            } else {
                value /= 31;
            }
        } else {
            if (key % 2 === 1) { // August, October, December, etc.
                value /= 31;
            } else {
                value /= 30;
            }
        }
        // month_map.set(key, value);
    });

    const total_days_active = getTotalDaysActive(dates_map, current_year);
    const days_active_percentage = getTotalDaysActivePercentage(total_days_active);

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
        archetype_colour
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

function getTopActivityTimeOfDay(hours_map) {
    let morning = 0;
    let evening = 0;
    let night = 0;
    hours_map.forEach (function(value, key) {
        if (key <= 12) {
            morning += 1
        } else if (key <= 18) {
            evening += 1;
        } else {
            night += 1;
        }
    });

    // I don't like how this breaks ties
    // 33 = morning, 66 = evening, 100 = night
    if (morning >= evening && morning >= night) {
        return 33;
    } else if (evening >= morning && evening >= night) {
        return 66;
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
