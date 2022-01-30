import { useState, useEffect } from 'react';
import { DEFAULT_DELAY_TIME } from '../constants';

function useDebounce<T>(
    value: T,
    delayTime: number = DEFAULT_DELAY_TIME
) {
    const [debouncedVal, setDebouncedVal] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(
            () => setDebouncedVal(value),
            delayTime
        );

        return () => clearTimeout(timer);
    })

    return debouncedVal;
}

export default useDebounce;