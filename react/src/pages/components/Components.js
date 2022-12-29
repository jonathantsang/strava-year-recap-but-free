import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Avatar from "@mui/material/Avatar";
import View from "react";

const StyledAvatar = ({ children, ...props }) => (
    <Avatar sx={{ height: '70px', width: '70px' }} {...props}>
        {children}
    </Avatar>
);

function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
        <hr />
      </CardContent>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          2022 TOTALS
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'beige'}}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
          <StyledAvatar alt="Strava user" src={props.avatar_url} />
          <Typography variant="h5" color="text.primary">
            {props.first_name} {props.last_name}
          </Typography>
        </CardContent>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'pink'}}>
        <Typography variant="body2" color="text.secondary">
          {props.title_one}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.description_one}
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'orange'}}>
        <Typography variant="body2" color="text.secondary" >
          {props.title_two}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.description_two} feet
        </Typography>
        <hr />
      </CardContent>

      <CardContent sx={{backgroundColor:'yellow'}}>
        <Typography variant="body2" color="text.secondary">
          {props.title_three}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.description_three} miles
        </Typography>
        <hr />
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export function TotalsCard(props) {
    return (<MediaCard {...props} />);
}
