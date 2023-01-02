import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// Icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function PRCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          Strava Year in Review but Free
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', outline: "black 2px solid"}}>
        <Typography gutterBottom variant="h4" component="div" margin="0px">
          MY {props.current_year} PRs <EmojiEventsIcon sx={{width: "2rem"}}/>
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#DDA946', display: "flex", justifyContent: "space-between", alignItems: 'center', outline: "black 2px solid"}}>
        <CardContent sx={{ width: "200px", padding:"0px" }}>
          <Typography variant="h5">
            {props.part_one_title}
          </Typography>
          <Typography gutterBottom variant="body2" component="div" sx={{"margin-bottom": "0px"}}>
            {props.part_one_description}
          </Typography>
        </CardContent>
        <Typography variant="h5">
          {props.part_one_after}
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#FEFFFE', display: "flex", justifyContent: "space-between", alignItems: 'center', outline: "black 2px solid"}}>
        <CardContent sx={{  width: "200px", padding:"0px" }}>
          <Typography variant="h5">
            {props.part_two_title}
          </Typography>
          <Typography gutterBottom variant="body2" component="div" sx={{"margin-bottom": "0px"}}>
            {props.part_two_description}
          </Typography>
        </CardContent>
        <Typography variant="h5">
          {props.part_two_after}
        </Typography>
      </CardContent>

      <CardContent sx={{backgroundColor:'#ff6600', display: "flex", justifyContent: "space-between", alignItems: 'center', outline: "black 2px solid"}}>
        <CardContent sx={{  width: "200px", padding:"0px" }}>
          <Typography variant="h5">
            {props.part_three_title}
          </Typography>
          <Typography gutterBottom variant="body2" component="div" sx={{"margin-bottom": "0px"}}>
            {props.part_three_description}
          </Typography>
        </CardContent>
        <Typography variant="h5">
          {props.part_three_after}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export default PRCard;
