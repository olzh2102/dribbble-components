import React, { useEffect, useState } from 'react';

import { useDebounce, useFetchCountries } from '../../hooks';
import SearchInput from '@components/search-input';
import CountryList from '@components/country-list';
import Skeleton from '@components/skeleton';
import Button from '@components/button';
import { CrossIcon } from '@components/icons';

import { StyledContainer } from './style';

const App = () => {
  const { countries, isLoading, isError } = useFetchCountries();
  console.log('Countries: ', countries);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm);

    const [selectedCountry, setSelectedCountry] = useState({})

    const handleRemoveCountry = () => {
        if (Object.keys(selectedCountry).length > 0)
            setSelectedCountry({})
    }

    useEffect(() => {
        // TODO: list re-render on searchTerm
    }, [debouncedValue])

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
            
            <div className="actions">
                <Button
                    as="link"
                    to="/"
                    label="NEXT"
                    variant="outlined"
                />


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
