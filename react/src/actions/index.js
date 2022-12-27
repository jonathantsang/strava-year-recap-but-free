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

export const setActivities = (data) => {
    return {
        type: "SET_ACTIVITIES",
        payload: data
    }
}
