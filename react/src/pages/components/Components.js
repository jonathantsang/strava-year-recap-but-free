import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DirectionsRun from '@mui/icons-material/DirectionsRun';
import DirectionsBike from '@mui/icons-material/DirectionsBike';

const StyledAvatar = ({ children, ...props }) => (
    <Avatar sx={{ height: '70px', width: '70px' }} {...props}>
        {children}
    </Avatar>
);

function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div">
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

export function TotalsCard(props) {
    return (<MediaCard {...props} />);
}
