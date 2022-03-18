import { Box } from '@mui/material';
import styled from '@emotion/styled';

import Statistics from './statistics';

const App = () => {
  return (
    <Container>
      <Box>Autocomplete Search component</Box>
      <Box
        sx={{
          padding: '10px',
        }}
      >
        <Statistics />
      </Box>
    </Container>
  );
};

export default App;

const Container = styled(Box)`
  display: flex;
  gap: 32px;
`;
