import { renderHook, QueryClientWrapper } from '../test/test-utils';

import useFetchCountries from './use-fetch-countries';

describe('use fetch countries hook', () => {
    function setup() {
        return renderHook(
            () => useFetchCountries(), 
            { wrapper: QueryClientWrapper }
        )
    }

    it('should return 3 countries', async () => {
        const { result, waitFor } = setup()
        // TODO: your assertions goes here
    })

    it.todo('should fail and show error message inside application')
})
