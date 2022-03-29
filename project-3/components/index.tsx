import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { pipe, prop, mergeLeft } from 'ramda';
import { Box } from '@mui/material';

import { onSave } from '@store/weatherSlice';
import useFetchCoordinates from '@hooks/use-fetch-coordinates';
import useFetchStatistics from '@hooks/use-fetch-statistics';
import useCurrentLocation from '@hooks/use-current-location';

import Statistics from './statistics';
import Autocomplete from '@common/storybook/stories/autocomplete';

const App = () => {
  const dispatch = useDispatch();

  const [city, setCity] = useState(INITIAL_CITY);
  const { name: cityName } = city;

  const currentLocation = useCurrentLocation();

  const { data: res } = useFetchCoordinates(
    { cityName },
    {
      enabled: !!cityName,
      onSuccess: pipe(
        prop('coord'),
        (mergeLeft as any)({ cityName }),
        onSave,
        dispatch
      ),
    }
  );

  const coordinates = res?.coord || currentLocation?.coord;

  const {
    data: statistics,
    isLoading,
    isIdle,
  } = useFetchStatistics({ coordinates }, { enabled: !!coordinates });

  return (
    <Box display="flex" sx={{ gap: '32px' }}>
      <Box>
        <Autocomplete
          label="Select a city"
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option: { label: string; name: string }) =>
            option.label || ''
          }
          options={CITIES}
          onChange={(val) => setCity(val || INITIAL_CITY)}
        />
      </Box>

      <Box>
        {isIdle ? (
          'Please, select a city'
        ) : isLoading ? (
          'Loading statistics for the city...'
        ) : (
          <Statistics data={statistics} cityName={cityName} />
        )}
      </Box>
    </Box>
  );
};

export default App;

const CITIES = [
  { label: 'Nur-Sultan', name: 'Astana' },
  { label: 'Minsk', name: 'Minsk' },
  { label: 'Karaganda', name: 'Karaganda' },
  { label: 'London', name: 'London' },
  { label: 'Lviv', name: 'Lviv' },
  { label: 'Faro', name: 'Faro' },
];

const INITIAL_CITY = {
  label: '',
  name: '',
};
