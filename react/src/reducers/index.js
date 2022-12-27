import { combineReducers } from "redux";

const setUserReducer = (tokens = null, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        default:
            return tokens;
    }
};

const setUserActivitiesReducer = (user = null, action) => {
    if (action.type === "SET_USER_ACTIVITIES") {
        return action.payload;
    }
    return user;
};

const setAthleteReducer = (athlete = null, action) => {
    if (action.type === "SET_ATHLETE") {
        return action.payload
    }
    return athlete
};

const setActivitiesReducer = (activities = null, action) => {
    if (action.type === "SET_ACTIVITIES") {
        return action.payload
    }
    return activities
};

export default combineReducers({
    returnTokens: setUserReducer,
    athlete: setAthleteReducer,
    activities: setActivitiesReducer,
    user: setUserActivitiesReducer,
});
