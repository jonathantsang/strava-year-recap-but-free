import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#ED4F2F",
  },
}));

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1, colorPrimary: "#1a90ff" }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#A8B15E">{props.month}</Typography>
      </Box>
    </Box>
  );
}

function LinearProgressWithDoubleLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#A8B15E">{props.front}</Typography>
      </Box>
      <Box sx={{ width: '80%', mr: 1, ml: 1, colorPrimary: "#1a90ff" }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#A8B15E">{props.back}</Typography>
      </Box>
    </Box>
  );
}

export function LinearProgressWithFixedLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: 75 }}>
        <Typography variant="body2" color="#A8B15E">{props.front}</Typography>
      </Box>
      <Box sx={{ width: '80%', mr: 1, ml: 1, colorPrimary: "#1a90ff" }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

export const StyledAvatar = ({ children, ...props }) => (
    <Avatar sx={{ height: '70px', width: '70px' }} {...props}>
        {children}
    </Avatar>
);

export const LargeStyledAvatar = ({ children, ...props }) => (
    <Avatar sx={{ height: props.height, width: props.width, bgcolor: props.bgcolor }} {...props}>
        {children}
    </Avatar>
);

export function HireMe(props) {
    return (
        <div>
          <p>Want to hire me Strava?</p>
          <p>Here is my <a href="https://www.linkedin.com/in/jonathan-tsang/">LinkedIn</a></p>
        </div>
    );
}
