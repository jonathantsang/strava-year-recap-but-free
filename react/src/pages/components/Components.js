import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// Icons
import DirectionsRun from '@mui/icons-material/DirectionsRun';
import DirectionsBike from '@mui/icons-material/DirectionsBike';
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
          <DirectionsBike sx={{width: "5rem", height: "5rem"}}/>
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

      <CardContent sx={{backgroundColor:'#F4F4DB'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <br />
        <br />
      </CardContent>

      <CardContent sx={{backgroundColor:'#F4F4DB'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <LargeStyledAvatar height="200px" width="200px" bgcolor="#ff6600">
          <WorkspacePremiumIcon sx={{width: "5rem", height: "5rem"}}/>
        </LargeStyledAvatar>
        <br />
      </CardContent>

      <CardContent sx={{backgroundColor:'#F4F4DB'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h4" color="#ff6600">
          Top {props.top_percentage}%
        </Typography>
        <br />
      </CardContent>

      <CardContent sx={{backgroundColor:'#F4F4DB'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
