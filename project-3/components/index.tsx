import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { pipe, prop, mergeLeft } from 'ramda';
import { Box } from '@mui/material';

import { TExclude } from '@common/types';
import { onSave } from '@store/weatherSlice';
import useFetchCoordinates from '@hooks/use-fetch-coordinates';
import useFetchStatistics from '@hooks/use-fetch-statistics';

import Statistics from './statistics';
import Autocomplete from '@common/storybook/stories/autocomplete';

const App = () => {
  const dispatch = useDispatch();

  const excludes = ['daily', 'minutely', 'alerts'] as TExclude[];
  const cityName = 'Astana';
  const [city, setCity] = useState({});
  console.log(city);

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
      <Box>
        <Autocomplete
          label="Select a city"
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option: any) => option.label || ''}
          options={[{ label: 'Nur-Sultan', name: 'Astana' }]}
          onChange={setCity}
        />
      </Box>

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
