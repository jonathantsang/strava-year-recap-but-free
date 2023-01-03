import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import Button from '@mui/material/Button';

export function DownloadButton(props) {
    console.log(props);
    const onButtonClick = async () => {
        await htmlToImage.toPng(props.propRef.current)
          .then(function (dataUrl) {
            download(dataUrl, 'image.png');
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      };

    return (<Button variant="contained" onClick={onButtonClick}>Download as PNG</Button>);
}
