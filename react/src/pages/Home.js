import React from "react";

import { TotalsCard, TotalDaysActiveCard, TopPhotosCard, HireMe } from "./components/Components";

const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "http://localhost:3000/redirect"

const handleLogin = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all`;
};

const Home = () => {
    return (
        <div>

            <HireMe />

            <TopPhotosCard activity_one_date="Date 1"
                           activity_one_title="Title 1"
                           activity_one_src=""
                           activity_two_date="Date 2"
                           activity_two_title="Title 2"
                           activity_two_src=""
                           activity_three_date="Date 3"
                           activity_three_title="Title 3"
                           activity_three_src=""/>

            <br />

            <TotalDaysActiveCard top_percentage="1"/>

            <br />

            <TotalsCard days_active="310"
                        total_elevation="99,475"
                        total_distance="3,747"
                        first_name="Jonathan"
                        last_name="Tsang"
                        avatar_src="https://dgalywyr863hv.cloudfront.net/pictures/athletes/90425641/21579479/12/large.jpg"
                        top_sport_src="shoe.png"/>

            <h1>Strava Year in Review but Free</h1>
            <button onClick={handleLogin}><img src="btn_strava_connectwith_orange@2x.png" alt="Connect with Strava"/></button>
        </div>
    );
};

export default Home;
