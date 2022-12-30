import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// Icons
import DirectionsRun from '@mui/icons-material/DirectionsRun';
import DirectionsBike from '@mui/icons-material/DirectionsBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

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
        <CardContent sx={{backgroundColor: '#276267', color:'white', height:'100%', outline: "black 2px solid" }}>
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
        </CardContent>
      </CardContent>

      <CardContent sx={{backgroundColor:'#ff6600', color:'white', outline: "black 2px solid"}}>
        <Typography variant="body2">
          ELEVATION
        </Typography>
        <Typography gutterBottom variant="h3" component="div" sx={{"margin-bottom": "0px"}}>
          {props.total_elevation}
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
          {props.total_distance}
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

// Convert TopSport to a conditional with different sport icons

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
          <Typography variant="body2" color="text.secondary">
            {props.activity_two_title}
          </Typography>
        </CardContent>
        <CardContent sx={{outline: "black 2px solid", margin: "0px", display: "flex", width:"250px", height: "250px"}}>
          <img src={props.activity_two_src !== undefined && props.activity_two_src} alt="strava activity 2"/>
        </CardContent>
      </CardContent>

      <CardContent sx={{backgroundColor:'#ff6600', display: "flex", justifyContent: "space-between", alignItems: 'center', padding: '0px',outline: "black 2px solid" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.activity_three_date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.activity_three_title}
          </Typography>
        </CardContent>
        <CardContent sx={{outline: "black 2px solid", margin: "0px", display: "flex", width:"250px", height: "250px"}}>
          <img src={props.activity_three_src !== undefined && props.activity_three_src} alt="strava activity 3"/>
        </CardContent>
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export function HireMe(props) {
    return (
        <div>
          <p>Want to hire me Strava?</p>
          <p>Here is my <a href="https://jonathantsang.github.io/resume/">resume</a></p>
        </div>
    );
}
