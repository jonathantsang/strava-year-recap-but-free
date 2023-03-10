import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { LargeStyledAvatar, LinearProgressWithFixedLabel } from "../Extras";
import { ShareButton } from '../utils/Download';
// Icons
import DirectionsRun from '@mui/icons-material/DirectionsRun';
import DirectionsBike from '@mui/icons-material/DirectionsBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

export function StravaArchetypeCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <div ref={props.propRef}>
      <CardContent header sx={{backgroundColor:'black', color: 'white'}}>
        <Typography gutterBottom variant="h4" component="div" margin="0px">
          My Athlete Archetype
        </Typography>
        <Typography variant="subtitle2" sx={{color:'white'}}>
          SPORTRECAP.APP
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F1ED'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <LargeStyledAvatar height="200px" width="200px" bgcolor={props.strava_archetype_colour} style={{background: props.strava_archetype_gradient_colour, borderRadius: "25%"}}>
          {props.strava_archetype.toLowerCase().includes("group") && props.top_sport_type.toLowerCase().includes("walk") &&
            <DirectionsWalkIcon sx={{width: "5rem", height: "5rem", opacity: "70%"}}/>
          }
          {props.strava_archetype.toLowerCase().includes("group") && props.top_sport_type.toLowerCase().includes("biking") &&
            <DirectionsBike sx={{width: "5rem", height: "5rem", opacity: "70%"}}/>
          }
          {props.strava_archetype.toLowerCase().includes("group") && props.top_sport_type.toLowerCase().includes("run") &&
            <DirectionsRun sx={{width: "5rem", height: "5rem", opacity: "70%"}}/>
          }
          {props.top_sport_type.toLowerCase().includes("walk") &&
            <DirectionsWalkIcon sx={{width: "5rem", height: "5rem", opacity: "85%"}}/>
          }
          {props.top_sport_type.toLowerCase().includes("biking") &&
            <DirectionsBike sx={{width: "5rem", height: "5rem", opacity: "85%"}}/>
          }
          {props.top_sport_type.toLowerCase().includes("run") &&
            <DirectionsRun sx={{width: "5rem", height: "5rem", opacity: "85%"}}/>
          }
        </LargeStyledAvatar>
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F1ED'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography gutterBottom variant="h4" component="div" margin="0px">
          {props.strava_archetype}
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F1ED'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography gutterBottom variant="subtitle2" component="div" margin="0px">
          {props.strava_archetype_description}
        </Typography>
        <br />
      </CardContent>
      <CardContent sx={{backgroundColor:'#062E4F', color: "white",}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          MY TOP SPORTS
        </Typography>
        <LinearProgressWithFixedLabel variant="determinate" value={props.sport_one} front={props.sport_one_name} back=""/>
        <LinearProgressWithFixedLabel variant="determinate" value={props.sport_two} front={props.sport_two_name} back=""/>
        <LinearProgressWithFixedLabel variant="determinate" value={props.sport_three} front={props.sport_three_name} back=""/>
      </CardContent>
      </div>
    </Card>
  );
}

export default StravaArchetypeCard;

<CardContent sx={{backgroundColor:'#F2F1ED'}}>
  <CircularProgress color="secondary" />
  <CircularProgress color="success" />
  <CircularProgress color="inherit" />
</CardContent>
