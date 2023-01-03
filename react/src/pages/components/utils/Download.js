import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

export function DownloadButton(props) {
    const onButtonClick = async () => {
        await htmlToImage.toPng(props.propRef.current)
          .then(function (dataUrl) {
            download(dataUrl, 'image.png');
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      };

    return (
        <Button variant="contained" onClick={onButtonClick}>SAVE AND SHARE</Button>
    );
}

export function ShareButton(props) {
    const onButtonClick = async () => {
        await htmlToImage.toPng(props.propRef.current)
          .then(function (dataUrl) {
            download(dataUrl, 'image.png');
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      };

    return (
        <CardActions>
          <Button size="small" onClick={onButtonClick}>SHARE</Button>
        </CardActions>
    );
}
