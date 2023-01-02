import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// Icons
import DirectionsRun from '@mui/icons-material/DirectionsRun';
import DirectionsBike from '@mui/icons-material/DirectionsBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ParkIcon from '@mui/icons-material/Park';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#ED4F2F",
  },
}));

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1, colorPrimary: "#1a90ff" }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#A8B15E">{props.month}</Typography>
      </Box>
    </Box>
  );
}
function LinearProgressWithDoubleLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#A8B15E">{props.front}</Typography>
      </Box>
      <Box sx={{ width: '80%', mr: 1, ml: 1, colorPrimary: "#1a90ff" }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#A8B15E">{props.back}</Typography>
      </Box>
    </Box>
  );
}

const StyledAvatar = ({ children, ...props }) => (
    <Avatar sx={{ height: '70px', width: '70px' }} {...props}>
        {children}
    </Avatar>
);

const LargeStyledAvatar = ({ children, ...props }) => (
    <Avatar sx={{ height: props.height, width: props.width, bgcolor: props.bgcolor }} {...props}>
        {children}
    </Avatar>
);

export function TotalsCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          2022 TOTALS
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#F4F4DB', display: "flex", justifyContent: "space-between", alignItems: 'center', outline: "black 2px solid" }}>
        <StyledAvatar alt="Strava user" src={props.avatar_src} />
        <Typography variant="h5" color="text.primary">
          {props.first_name} {props.last_name}
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#ffbdf5', display: "flex", justifyContent: "space-between", alignItems: 'center', padding: '0px', maxHeight: '200px', outline: "black 2px solid" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            DAYS ACTIVE
          </Typography>
          <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px"}}>
            {props.days_active}
          </Typography>
        </CardContent>

        {props.top_sport_type !== "None" && <CardContent sx={{backgroundColor: '#276267', color:'white', height:'100%', outline: "black 2px solid" }}>
          <Typography variant="body2" color="white">
            TOP SPORT
          </Typography>
          {props.top_sport_type === "Walk" &&
            <DirectionsWalkIcon sx={{width: "5rem", height: "5rem"}}/>
            }
          {props.top_sport_type === "Ride" &&
            <DirectionsBike sx={{width: "5rem", height: "5rem"}}/>
          }
          {props.top_sport_type === "MountainBikeRide" &&
            <DirectionsBike sx={{width: "5rem", height: "5rem"}}/>
          }
          {props.top_sport_type === "GravelRide" &&
            <DirectionsBike sx={{width: "5rem", height: "5rem"}}/>
          }
          {props.top_sport_type === "TrailRun" &&
            <DirectionsRun sx={{width: "5rem", height: "5rem"}}/>
          }
          {props.top_sport_type === "Run" &&
            <DirectionsRun sx={{width: "5rem", height: "5rem"}}/>
          }
        </CardContent> }
      </CardContent>

      <CardContent sx={{backgroundColor:'#ff6600', color:'white', outline: "black 2px solid"}}>
        <Typography variant="body2">
          ELEVATION
        </Typography>
        <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px"}}>
          {props.total_elevation.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          FEET
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#ffdb29', outline: "black 2px solid"}}>
        <Typography variant="body2" color="text.secondary">
          DISTANCE
        </Typography>
        <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px"}}>
          {props.total_distance.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          MILES
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export function TopPercentCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          TOTAL DAYS ACTIVE
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F2EC'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <br />
        <br />
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F2EC'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <LargeStyledAvatar height="200px" width="200px" bgcolor="#ff6600">
          <WorkspacePremiumIcon sx={{width: "5rem", height: "5rem"}}/>
        </LargeStyledAvatar>
        <br />
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F2EC'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h4" color="#ff6600">
          Top {props.top_percentage}%
        </Typography>
        <br />
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F2EC'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h6" color="text.primary">
          MOST ACTIVE ON STRAVA IN 2022
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export function TopPhotosCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 1000 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          TOP PHOTOS
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#DDA946', display: "flex", justifyContent: "space-between", alignItems: 'center', padding: '0px', outline: "black 2px solid" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.activity_one_date}
          </Typography>
          <br/>
          <Typography variant="body2" color="text.secondary">
            {props.activity_one_title}
          </Typography>
        </CardContent>
        <CardContent sx={{outline: "black 2px solid", margin: "0px", display: "flex", width:"250px", height: "250px"}}>
          <img src={props.activity_one_src !== undefined && props.activity_one_src} alt="strava activity 1" max-width="100%" max-height="100%" />
        </CardContent>
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', display: "flex", justifyContent: "space-between", alignItems: 'center', padding: '0px', outline: "black 2px solid" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.activity_two_date}
          </Typography>
          <br/>
          <Typography variant="body2" color="text.secondary">
            {props.activity_two_title}
          </Typography>
        </CardContent>
        <br/>
        <CardContent sx={{outline: "black 2px solid", margin: "0px", display: "flex", width:"250px", height: "250px"}}>
          <img src={props.activity_two_src !== undefined && props.activity_two_src} alt="strava activity 2" max-width="100%" max-height="100%" />
        </CardContent>
      </CardContent>

      <CardContent sx={{backgroundColor:'#ff6600', display: "flex", justifyContent: "space-between", alignItems: 'center', padding: '0px', outline: "black 2px solid" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.activity_three_date}
          </Typography>
          <br/>
          <Typography variant="body2" color="text.secondary">
            {props.activity_three_title}
          </Typography>
        </CardContent>
        <br/>
        <CardContent sx={{outline: "black 2px solid", margin: "0px", display: "flex", width:"250px", height: "250px"}}>
          <img src={props.activity_three_src !== undefined && props.activity_three_src} alt="strava activity 3" max-width="100%" max-height="100%" />
        </CardContent>
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export function TotalElevationTotalDistanceCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          TOTAL ELEVATION
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#ff6600', color:'white', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px"}}>
          {props.total_elevation.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          FEET
        </Typography>
        <br />
        <br />
        <br />
        <br />
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          TOTAL DISTANCE
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#495227', "color": "#ffdb29", outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px"}}>
          {props.total_distance.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          MILES
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export function AchievementsCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          ACHIEVEMENTS
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#DDA946', outline: "black 2px solid"}}>
        <ParkIcon />
        <Typography variant="body2">
          LOCAL LEGENDS
        </Typography>
        <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px"}}>
          {props.local_legends.toLocaleString()}
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F343', outline: "black 2px solid"}}>
        <Typography variant="body2">
          PERSONAL RECORDS
        </Typography>
        <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px"}}>
          {props.personal_records.toLocaleString()}
        </Typography>
        <EmojiEventsIcon />
      </CardContent>


      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          KUDOS
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#062E4F', color:'white', outline: "black 2px solid"}}>
        <Typography variant="body2">
          Received
        </Typography>
        <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px", "color": "#EDD74A"}}>
          {props.kudos_received.toLocaleString()}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export function TotalDaysActiveCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          TOTAL DAYS ACTIVE
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#062E4F', color: "white",}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          {props.days_active} DAYS
        </Typography>
        <LinearProgressWithLabel variant="determinate" value={props.jan} month="JAN" />
        <LinearProgressWithLabel variant="determinate" value={props.feb} month="FEB" />
        <LinearProgressWithLabel variant="determinate" value={props.mar} month="MAR" />
        <LinearProgressWithLabel variant="determinate" value={props.apr} month="APR" />
        <LinearProgressWithLabel variant="determinate" value={props.may} month="MAY" />
        <LinearProgressWithLabel variant="determinate" value={props.jun} month="JUN" />
        <LinearProgressWithLabel variant="determinate" value={props.jul} month="JUL" />
        <LinearProgressWithLabel variant="determinate" value={props.aug} month="AUG" />
        <LinearProgressWithLabel variant="determinate" value={props.sep} month="SEP" />
        <LinearProgressWithLabel variant="determinate" value={props.oct} month="OCT" />
        <LinearProgressWithLabel variant="determinate" value={props.nov} month="NOV" />
        <LinearProgressWithLabel variant="determinate" value={props.dec} month="DEC" />
      </CardContent>


      {props.top_sport_types && <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h6" component="div" margin="0px">
          MY TOP SPORTS 2022
        </Typography>
        <Typography gutterBottom variant="h6" component="div" margin="0px">
          {props.top_sport_types.length > 0 && props.top_sport_types[0][1]}, {props.top_sport_types.length > 1 && props.top_sport_types[1][1]}, {props.top_sport_types.length > 2 && props.top_sport_types[2][1]}
        </Typography>
      </CardContent> }

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export function StravaArchetypeCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black', color: 'white'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography gutterBottom variant="h4" component="div" margin="0px">
          My Strava Archetype
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <LargeStyledAvatar height="200px" width="200px" bgcolor={props.archetype_colour}>
          <WorkspacePremiumIcon sx={{width: "5rem", height: "5rem"}}/>
        </LargeStyledAvatar>
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography gutterBottom variant="h4" component="div" margin="0px">
          {props.strava_archetype}
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography gutterBottom variant="h6" component="div" margin="0px">
          {props.strava_archetype_description}
        </Typography>
        <br />
      </CardContent>

      <CardContent sx={{backgroundColor:'#062E4F', color: "white",}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          MY STATS
        </Typography>
        <LinearProgressWithDoubleLabel variant="determinate" value={props.time_of_day} front="TOP%" back=""/>
        <LinearProgressWithDoubleLabel variant="determinate" value={props.time_of_day} front="AM" back="PM"/>
        <LinearProgressWithDoubleLabel variant="determinate" value={props.time_of_day} front="KUDOS" back=""/>
      </CardContent>
    </Card>
  );
}

export function HireMe(props) {
    return (
        <div>
          <p>Want to hire me Strava?</p>
          <p>Here is my <a href="https://www.linkedin.com/in/jonathan-tsang/">LinkedIn</a></p>
        </div>
    );
}
