import React, { useEffect, useState } from 'react';

import { isEmpty } from '../../utils';
import { useDebounce, useFetchCountries } from '../../hooks';
import SearchInput from '../search-input';
import CountryList from '../country-list';
import Skeleton from '../skeleton';
import Button from '../button';
import { CrossIcon } from '../icons';

import { StyledContainer } from './style';

const App = () => {
  const { data: res, isLoading, isError } = useFetchCountries();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm);

  const [selectedCountry, setSelectedCountry] = useState({} as any);

  const handleRemoveCountry = () => {
    if (!isEmpty(selectedCountry)) setSelectedCountry({});
  };

  useEffect(() => {
    // TODO: list re-render on searchTerm
  }, [debouncedValue]);

  return (
    <StyledContainer data-testid="app">
      <SearchInput
        onChange={setSearchTerm}
        placeholder="Search countries"
        value={searchTerm}
      />

      {isLoading ? (
        <Skeleton count={5} />
      ) : isError ? (
        <div>Error happened</div>
      ) : (
        <CountryList
          countries={res?.data.data}
          onSelect={setSelectedCountry}
          selectedCountry={selectedCountry}
        />
      )}

      <div className="actions">
        <Button as="link" to="/" label="NEXT" variant="outlined" />

        <Button
          onClick={handleRemoveCountry}
          icon={<CrossIcon />}
          disabled={Object.keys(selectedCountry).length == 0}
          variant="contained"
        />
      </div>
    </StyledContainer>
  );
};

export default App;
