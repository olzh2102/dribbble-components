import Box from '@mui/material/Box';
import { default as MuiCard } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Card = () => {
  return (
    <Box sx={{ maxWidth: 275 }}>
      <MuiCard>
        <CardContent>
          <Typography variant="h5">Card</Typography>
          <Typography variant="body2">Card Content</Typography>
        </CardContent>
      </MuiCard>
    </Box>
  );
};

export default Card;
