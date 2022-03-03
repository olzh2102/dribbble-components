import React from 'react';
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Autocomplete = (props: AutocompleteProps) => {   
    return (
        <MuiAutocomplete 
            {...props}
            options={[''].concat(props.options)}
            onChange={(e, val) => props.onChange(val)}
            renderInput={params => (
                <TextField 
                    {...params}
                    label={props.label}
                />
            )}
        />
    )
}

export default Autocomplete

type AutocompleteProps = Omit<MuiAutocompleteProps<any, any, any, any>, 'renderInput'> & {
    label: string;
    onChange: (val: any) => void | null;
}