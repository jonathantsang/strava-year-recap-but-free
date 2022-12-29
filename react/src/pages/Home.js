import React from "react";

import { TotalsCard } from "./components/Components";
import CustomizedTables from "./components/Table";

const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = "http://localhost:3000/redirect"

const handleLogin = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all`;
};

const Home = () => {
    return (
        <div>

            <TotalsCard title_one="DAYS ACTIVE"
                        description_one="310"
                        title_two="ELEVATION"
                        description_two="99,475"
                        title_three="DISTANCE"
                        description_three="3,747"
                        first_name="Jonathan"
                        last_name="Tsang"
                        avatar_url="https://dgalywyr863hv.cloudfront.net/pictures/athletes/90425641/21579479/12/large.jpg"/>

            <h1>Strava Year in Review but Free</h1>
            <button onClick={handleLogin}><img src="btn_strava_connectwith_orange@2x.png" alt="Connect with Strava"/></button>
        </div>
    );
};

export default Home;
