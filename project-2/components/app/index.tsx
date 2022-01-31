import React, { useEffect, useState } from 'react'

import { useDebounce, useFetchCountries } from '../../hooks'
import SearchInput from '../search-input'
import { StyledContainer } from './style'

const App = () => {
    const { countries, isLoading, isError } = useFetchCountries()
    console.log('Countries: ', countries)

    const [searchTerm, setSearchTerm] = useState('')
    const debouncedValue = useDebounce(searchTerm)

    useEffect(() => {
        // TODO: list re-render on searchTerm
    }, [debouncedValue])

    return (    
        <StyledContainer data-testid="app">
            <SearchInput
                onChange={(val: string) => setSearchTerm(val)}
                placeholder="Search countries"
                value={searchTerm}
            />
            
            {
                isLoading 
                    // TODO: replace loading div with Skeleton component
                    ? <div>Countries are loading...</div> 
                    : isError 
                    ? <div>Error happened</div>
                    // TODO: replace div with Country component inside iterate over countries
                    : <div>Countries will go here</div>
            }
        </StyledContainer>
    )
}

export default App;