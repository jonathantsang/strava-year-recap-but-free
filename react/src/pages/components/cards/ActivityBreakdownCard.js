import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PieChart from "../PieChart";

export function ActivityBreakdownCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px">
          ACTIVITY BREAKDOWN
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#F2F1ED'}}>
        <PieChart {...props} />
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export default ActivityBreakdownCard;
