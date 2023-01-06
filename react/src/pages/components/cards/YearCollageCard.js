import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { MasonryImageList, MasonryImageLargeList } from '../presets/MasonryImageList';

export function YearCollageCard(props) {
  return (
    <Card ref={props.propRef} sx={{ maxWidth: 400, maxHeight: 800 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          My {props.current_year} on Strava
        </Typography>
        <Typography variant="subtitle2" sx={{color:'white'}}>
          SPORTRECAP.APP
        </Typography>
      </CardContent>
      <MasonryImageList {...props}/>
    </Card>
  );
}

export function YearCollagePoster(props) {
  return (
    <Card ref={props.propRef} sx={{ maxWidth: 1200, maxHeight: 900 }}>
      <CardContent header sx={{backgroundColor:'black'}}>
        <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
          My {props.current_year} on Strava
        </Typography>
        <Typography variant="subtitle2" sx={{color:'white'}}>
          SPORTRECAP.APP
        </Typography>
      </CardContent>
      <MasonryImageLargeList {...props}/>
    </Card>
  );
}

export default YearCollageCard;
