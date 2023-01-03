export function getArchetypeData(highest_sports_type_counts, total_year_activities, athlete_count_count, top_activity_time_of_day, total_kudos, sport_time_group) {
    // remove commutes on ebike?
    // Gradients
    let gradient_colour = "";
    const morning_gradient = "linear-gradient(156deg, rgba(2,0,36,1) 0%, rgba(122,61,61,1) 27%, rgba(187,135,93,1) 49%, rgba(216,0,255,1) 71%)";
    const midday_gradient = "linear-gradient(142deg, rgba(2,0,36,1) 0%, rgba(61,122,90,1) 27%, rgba(165,187,93,1) 49%, rgba(255,134,0,1) 71%)";
    const evening_gradient = "linear-gradient(156deg, rgba(2,0,36,1) 0%, rgba(61,93,122,1) 27%, rgba(93,187,158,1) 49%, rgba(160,0,255,1) 71%)";
    const night_gradient = "linear-gradient(156deg, rgba(2,0,36,1) 0%, rgba(61,61,122,1) 35%, rgba(48,47,102,1) 53%, rgba(0,212,255,1) 100%)";

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
        sport_balance_text = "You mainly like " + highest_sports_type_counts[0][1].toLowerCase() + ", but from time to time you'll be " + highest_sports_type_counts[1][1].toLowerCase() + ".";
    } else {
        // closer activity acuity
        sport_balance_text = "You mainly balance between " + highest_sports_type_counts[0][1].toLowerCase() + " and " + highest_sports_type_counts[1][1].toLowerCase() + ".";
    }

    // This is recalculated based on activity + time of day versus just time of day + if you do group activities
    // otherwise go back to old "wrong" calculation
    // Dictate next part BASED on the top sport
    // ex.
    // if it is running
    // only look at solo/group and time of day bucket on keys with run in it
    let relevant_activities = [];
    sport_time_group.forEach (function(value, key) {
        if (key.includes(highest_sports_type_counts[0][0])) {
            relevant_activities.push([value, key]);
        }
    });
    relevant_activities.sort(); // Worst case 1 sport, 4 times of day, solo/group so n = 8

    // I hate having to recalculate this again
    let solo = 0;
    let group = 0;
    // times of day count
    let morning = 0;
    let midday = 0;
    let evening = 0;
    let night = 0;

    // Only count relevant activities
    relevant_activities.forEach (function(item, index, arr) {
        // solo or group
        if (item[1].includes("solo")) {
            solo += item[0];
        } else {
            group += item[0];
        }

        // Time of day
        if (item[1].includes("morning")) {
            morning += item[0];
        } else if (item[1].includes("midday")) {
            midday += item[0];
        } else if (item[1].includes("evening")) {
            evening += item[0];
        } else if (item[1].includes("night")) {
            night += item[0];
        }
    });

    if (group >= solo) {
        athlete_count_text = "You got a great fitness squad since most of your activities in a group!";
        athlete_count_title_text = "Group";
    } else {
        athlete_count_text = "You get things done and it shows! Most of the time you like doing activities on your own.";
        athlete_count_title_text = "Solo";
    }

    if (morning === Math.max(morning, midday, evening, night)) {
        time_of_day_text = "You must be a morning person because mornings are your most popular time of day.";
        time_of_day_title_text = "Morning";
        gradient_colour = morning_gradient;
    } else if (midday === Math.max(morning, midday, evening, night)) {
        time_of_day_text = "You get most activities done in the daylight";
        time_of_day_title_text = "Midday";
        gradient_colour = midday_gradient;
    } else if (evening === Math.max(morning, midday, evening, night)){
        time_of_day_text = "You get most activities done during the afternoon and evening.";
        time_of_day_title_text = "Evening";
        gradient_colour = evening_gradient;
    } else {
        time_of_day_text = "Look at this night owl! You get most activities done during the night.";
        time_of_day_title_text = "Night";
        gradient_colour = night_gradient;
    }

    if (total_kudos >= 10000) {
        kudos_count_text = "You receive more kudos than the majority of Strava users.";
    } else if (total_kudos >= 4000) {
        kudos_count_text = "Your activities also have a lot of kudos on each one!";
    } else {
        kudos_count_text = "You receive a fair amount of kudos on each activity.";
    }

    // Title text
    if (highest_sports_type_counts[0][1].toLowerCase().includes("run")) {
        athlete_type_title_text = "Runner";
    } else if (highest_sports_type_counts[0][1].toLowerCase().includes("biking")) {
        athlete_type_title_text = "Biker";
    }

    let description = `${sport_balance_text} ${athlete_count_text} ${time_of_day_text} ${kudos_count_text}`
    let title = `${athlete_count_title_text} ${time_of_day_title_text} ${athlete_type_title_text}`
    return [title, description, gradient_colour]
}
