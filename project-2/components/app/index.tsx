import React, { useEffect, useState } from 'react';

import { useDebounce } from '../../hooks';
import SearchInput from '../search-input';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedValue = useDebounce(searchTerm);

    useEffect(() => {
        // TODO: list re-render on searchTerm
    }, [debouncedValue])
    
    return (    
        <div data-testid="app">
            <SearchInput
                onChange={(val: string) => setSearchTerm(val)}
                placeholder="Search countries"
                value={searchTerm}
            />
        </div>
    )
}

export default App;