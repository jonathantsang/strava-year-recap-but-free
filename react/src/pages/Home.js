import React, { useRef } from "react";

import { HireMe } from "./components/Extras";
import { DownloadButton } from "./components/utils/Download"

const { REACT_APP_CLIENT_ID } = process.env;
// const redirectUrl = "https://strava-year-recap-but-free-x7xf.vercel.app/redirect"
const redirectUrl = "http://localhost:3000/redirect"

const handleLogin = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all`;
};

const Home = () => {
    const testRef = useRef();

    return (
        <div>
            <HireMe id="hire-me" refProp={testRef}/>

            <br />

            <DownloadButton propRef={testRef}/>

            <p>Disclaimer</p>
            <strong>Exact data may not match official stats due to API limitations and estimating days active curve.</strong>

            <h1>Strava Year in Review but Free</h1>
            <button onClick={handleLogin}><img src="btn_strava_connectwith_orange@2x.png" alt="Connect with Strava"/></button>
        </div>
    );
};

export default Home;
