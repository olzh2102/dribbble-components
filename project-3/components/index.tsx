import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { pipe, prop } from 'ramda';

import Statistics from './statistics';
import useFetchCoordinates from '@hooks/use-fetch-coordinates';
import useFetchStatistics from '@hooks/use-fetch-statistics';
import { onSave } from '@store/weatherSlice';

const App = () => {
  const dispatch = useDispatch();
  const excludes = ['daily', 'minutely', 'alerts'] as any;

  const { data: res }: any = useFetchCoordinates(
    { city: 'Astana', excludes },
    {
      onSuccess: pipe(
        prop('coord'),
        (coord: any) => ({
          cityName: 'Astana',
          lat: coord.lat,
          lon: coord.lon,
        }),
        onSave,
        dispatch
      ),
    }
  );

  const coordinates = res?.coord;

  const { data: statistics } = useFetchStatistics(
    { coordinates, excludes },
    { enabled: !!coordinates }
  );

  return (
    <Container>
      <Box>Autocomplete Search component</Box>

      <Box>
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
