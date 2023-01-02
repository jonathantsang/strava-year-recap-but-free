export function metreToMiles(amount) {
    return Math.round(amount / 1609); // approximate
}

export function metreToFeet(amount) {
    return Math.round(amount * 3.281); // approximate
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export var stringToColour = function(str) {
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

export function secondsToTime(seconds) {
    let formattedTime = new Date(seconds * 1000).toISOString().slice(11, 19);
    let i = 0;
    while ((i < formattedTime.length) && (formattedTime[i] === "0" || formattedTime[i] === ":")) {
        i += 1;
    }
    return formattedTime.slice(i,formattedTime.length);
}

// I like ... sport
export const SportTypeEnumMap = new Map(Object.entries(
    {AlpineSki: "alpine skiing",
     BackcountrySki: "backcountry skiing",
     Canoeing: "canoeing",
     Crossfit: "crossfit",
     EBikeRide: "ebiking",
     Elliptical: "elliptical",
     EMountainBikeRide: "emountain biking",
     Golf: "golfing",
     GravelRide: "gravel biking",
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
