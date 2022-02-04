import React, { useEffect, useState } from 'react';

import { useDebounce, useFetchCountries } from '../../hooks';
import SearchInput from '@components/search-input';
import { StyledContainer } from './style';
import CountryList from '@components/country-list';
import Skeleton from '@components/skeleton';

const App = () => {
  const { countries, isLoading, isError } = useFetchCountries();
  console.log('Countries: ', countries);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm);

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
        <CountryList countries={countries} onSelect={setSearchTerm} />
      )}
            
            

            <Button
                as="link"
                to=""
                onClick={() => {}}
                icon={null}
                label=""
                disabled={false}
                variant="outlined"
            />
        </StyledContainer>
  );
};

export default App;
