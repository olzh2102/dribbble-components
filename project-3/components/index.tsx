import { useDispatch } from 'react-redux';
import { pipe, prop, mergeLeft } from 'ramda';
import { Box } from '@mui/material';

import { TExclude } from '@common/types';
import { onSave } from '@store/weatherSlice';
import useFetchCoordinates from '@hooks/use-fetch-coordinates';
import useFetchStatistics from '@hooks/use-fetch-statistics';

import Statistics from './statistics';

const App = () => {
  const dispatch = useDispatch();

  const excludes = ['daily', 'minutely', 'alerts'] as TExclude[];
  const cityName = 'Astana';

  const { data: res } = useFetchCoordinates(
    { cityName, excludes },
    {
      onSuccess: pipe(
        prop('coord'),
        (mergeLeft as any)({ cityName }),
        onSave,
        dispatch
      ),
    }
  );

  const coordinates = res?.coord;

  const { data: statistics, isLoading } = useFetchStatistics(
    { coordinates, excludes },
    { enabled: !!coordinates }
  );

  return (
    <Box display="flex" sx={{ gap: '32px' }}>
      <Box>Autocomplete Search component</Box>

      <Box>
        {isLoading ? (
          'Loading statistics for the city...'
        ) : (
          <Statistics data={statistics} />
        )}
      </Box>
    </Box>
  );
};

export default App;
