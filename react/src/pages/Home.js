import React from "react";

import { TotalsCard } from "./components/Components";

const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "http://localhost:3000/redirect"

const handleLogin = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all`;
};

const Home = () => {
    return (
        <div>

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
