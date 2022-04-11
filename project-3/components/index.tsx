import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { pipe, prop, mergeLeft } from 'ramda';
import { Box } from '@mui/material';

import { onSave } from '@store/weatherSlice';
import {
  useFetchCoordinates,
  useFetchStatistics,
  useFetchCityName,
  useCurrentLocationCoordinates,
} from '@hooks/index';

import Statistics from './statistics';
import Autocomplete from '@common/storybook/stories/autocomplete';

const App = () => {
  const dispatch = useDispatch();

  const [city, setCity] = useState(INITIAL_CITY);
  const { name: cityName } = city;

  const currentLocation = useCurrentLocationCoordinates();

  const { data: res } = useFetchCoordinates(
    { cityName },
    {
      enabled: !!cityName && cityName !== INITIAL_CITY.name,
      onSuccess: pipe(
        prop('coord'),
        (mergeLeft as any)({ cityName }),
        onSave,
        dispatch
      ),
    }
  );

  const coordinates = res?.coord || currentLocation?.coord;

  useFetchCityName(
    { coordinates },
    {
      enabled: cityName === INITIAL_CITY.name,
      onSuccess: ([result]) =>
        result && setCity({ name: result.name, label: result.name }),
    }
  );

  const {
    data: statistics,
    isLoading,
    isIdle,
  } = useFetchStatistics(
    { coordinates },
    {
      enabled: !!coordinates && !!coordinates.lat && !!coordinates.lon,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Box display="flex" sx={{ gap: '32px' }}>
      <Box>
        <Autocomplete
          label="Select a city"
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option: { label: string; name: string }) =>
            option.label || INITIAL_CITY.label
          }
          options={CITIES}
          onChange={(val) => setCity(val || INITIAL_CITY)}
        />
      </Box>

      <Box>
        {isIdle || isLoading ? (
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
  { label: 'Ottava', name: 'Ottava' },
];

const INITIAL_CITY = {
  label: 'Your current city',
  name: 'Your current city',
};
