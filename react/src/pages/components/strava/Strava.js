import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const CardBanner = () => {
    return (
        <CardContent header sx={{backgroundColor:'black'}}>
          <Typography gutterBottom variant="h5" component="div" margin="0px" sx={{color:'white'}}>
            Strava Year in Review but Free
          </Typography>
          <Typography variant="subtitle2" sx={{color:'white'}}>
            SPORTRECAP.APP
          </Typography>
        </CardContent>
    );
}
