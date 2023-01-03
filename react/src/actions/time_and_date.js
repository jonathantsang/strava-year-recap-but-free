import { capitalizeFirstLetter, secondsToTime, SportTypeEnumMap } from "./utilities";

// Analytics on data

// Make it easier and divide each month to get percentage for each month
export function convertMonthMap(month_map, current_year) {
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
    });
}

export function getHighestSportTypeCounts(sport_type_map) {
    const top_nth = 5; // want top 5 now
    let highest_sport_type_counts = []; // [amount, sport_type]

    sport_type_map.forEach (function(value, key) {
        highest_sport_type_counts.push([value.size, key]);

        // sort each iteration
        // this is less efficient but based on fixed number of sport_type and it being length == 3 at max
        // I think it is fine for now
        // want max value at the front
        highest_sport_type_counts.sort(function(a, b){return b[0] - a[0]});
        if (highest_sport_type_counts.length > top_nth) {
            highest_sport_type_counts.pop();
        }
    });

    highest_sport_type_counts.forEach (function(item, index, arr) {
        highest_sport_type_counts[index] = [highest_sport_type_counts[index][0], capitalizeFirstLetter(SportTypeEnumMap.get(highest_sport_type_counts[index][1]))]
    });

    return highest_sport_type_counts;
}

// Get the total days active in current_year by going through and counting them manually
export function getTotalDaysActive(dates_map, current_year = 2022) {
    const year_days = new Set();
    dates_map.forEach (function(value, key) {
        if (key.getFullYear() === current_year) {
            year_days.add(key.getMonth() + '/' + key.getDate());
        }
    });
    return year_days.size;
}

// TODO
export function getTotalDaysActivePercentage(total_days_active) {
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

export function getTimeOfDayBucket(hour) {
    if (hour <= 10) {
        return "morning";
    } else if (hour <= 13) {
        return "midday";
    } else if (hour <= 17) {
        return "evening";
    } else {
        return "night";
    }
}

export function getTopActivityTimeOfDay(hours_map) {
    let morning = 0;
    let midday = 0;
    let evening = 0;
    let night = 0;
    hours_map.forEach (function(value, key) {
        const time_of_day_bucket = getTimeOfDayBucket(key);
        if (time_of_day_bucket === "morning") {
            morning += value;
        } else if (time_of_day_bucket === "midday") {
            midday += value;
        } else if (time_of_day_bucket === "evening") {
            evening += value;
        } else {
            night += value;
        }
    });

    // I don't like how this breaks ties
    // 25 = morning, 45 = midday, 66 = evening, 100 = night
    if (morning >= evening && morning >= night && morning >= midday) {
        return 25;
    } else if (midday >= morning && midday >= evening && midday >= night) {
        return 45;
    } else if (evening >= morning && evening >= midday && evening >= night) {
        return 66;
    } else {
        return 100;
    }
}

export function saveBestEffortsRun(best_effort_map, activity) {
    const marathon_in_metres = 42195;
    const half_marathon_in_metres = 21097;
    const ten_miles_in_metres = 16093;
    const ten_k = 10000;
    const five_miles_in_metres = 8046;
    const five_k = 5000;

    if (activity["sport_type"] !== "Run") {
        return
    }

    // marathon is max for now since ultras are too complicated with 50k,50m,100k,100m,etc.
    if (activity["distance"] >= marathon_in_metres) {
        if (best_effort_map.get("full") !== undefined) {
            // check if best
            if (best_effort_map.get("full")["moving_time"] > activity["moving_time"]) {
                best_effort_map.set("full", activity);
            }
        } else {
            best_effort_map.set("full", activity);
        }
    } else if (activity["distance"] >= half_marathon_in_metres) {
        // half marathon
        if (best_effort_map.get("half") !== undefined) {
            if (best_effort_map.get("half")["moving_time"] > activity["moving_time"]) {
                best_effort_map.set("half", activity);
            }
        } else {
            best_effort_map.set("half", activity);
        }
    } else if (activity["distance"] >= ten_miles_in_metres) {
        // 10 miles
        if (best_effort_map.get("ten_miles") !== undefined) {
            if (best_effort_map.get("ten_miles")["moving_time"] > activity["moving_time"]) {
                best_effort_map.set("ten_miles", activity);
            }
        } else {
            best_effort_map.get("ten_miles");
        }
    } else if (activity["distance"] >= ten_k) {
        // 10K
        if (best_effort_map.get("ten_k") !== undefined) {
            if (best_effort_map.get("ten_k")["moving_time"] > activity["moving_time"]) {
                best_effort_map.set("ten_k", activity);
            }
        } else {
            best_effort_map.set("ten_k", activity);
        }
    } else if (activity["distance"] >= five_miles_in_metres) {
        // 5 miles
        if (best_effort_map.get("five_miles") !== undefined) {
            if (best_effort_map.get("five_miles")["moving_time"] > activity["moving_time"]) {
                best_effort_map.set("five_miles", activity);
            }
        } else {
            best_effort_map.set("five_miles", activity);
        }
    } else if (activity["distance"] >= five_k) {
        // 5K
        if (best_effort_map.get("five_k") !== undefined) {
            if (best_effort_map.get("five_k")["moving_time"] > activity["moving_time"]) {
                best_effort_map.set("five_k", activity);
            }
        } else {
            best_effort_map.set("five_k", activity);
        }
    }
}

// Return the "best" best efforts from the map
// ordered by longest first
export function getBestEffortRunList(best_effort_run_map) {
    const ret = [];
    if (best_effort_run_map.has("full")) {
        let activity = best_effort_run_map.get("full");
        ret.push([best_effort_run_map.get("full"), "Marathon", secondsToTime(activity["moving_time"])]);
    }
    if (best_effort_run_map.has("half")) {
        let activity = best_effort_run_map.get("half");
        ret.push([best_effort_run_map.get("half"), "Half Marathon", secondsToTime(activity["moving_time"])]);
    }
    if (best_effort_run_map.has("ten_miles")) {
        let activity = best_effort_run_map.get("ten_miles");
        ret.push([best_effort_run_map.get("ten_miles"), "Ten Miles", secondsToTime(activity["moving_time"])]);
    }
    if (best_effort_run_map.has("ten_k")) {
        let activity = best_effort_run_map.get("ten_k");
        ret.push([best_effort_run_map.get("ten_k"), "10K", secondsToTime(activity["moving_time"])]);
    }
    if (best_effort_run_map.has("five_miles")) {
        let activity = best_effort_run_map.get("five_miles");
        ret.push([best_effort_run_map.get("five_miles"), "Five Miles", secondsToTime(activity["moving_time"])]);
    }
    if (best_effort_run_map.has("five_k")) {
        let activity = best_effort_run_map.get("five_k");
        ret.push([best_effort_run_map.get("five_k"), "5K", secondsToTime(activity["moving_time"])]);
    }

    return ret;
}
