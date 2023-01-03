import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ShareButton } from '../utils/Download';

// Icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Shows PRs for set distances for the year
// issues:
// 1. If a strava race is not the full amount 13 miles not 13.1 it won't be counted
// 2. I wanted to do how much better you did a race but it is tough since some people
// may have a PR that was from years earlier and that is a lot of activities to go through

export function PRCard(props) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
      <div ref={props.propRef}>
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

      <CardContent sx={{backgroundColor:'#F2F1ED', display: "flex", justifyContent: "space-between", alignItems: 'center', outline: "black 2px solid"}}>
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
     </div>
     <ShareButton propRef={props.propRef}/>
  </Card>
  );
}

export default PRCard;
