import React from 'react';
import { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { MuiAutocompleteStyled } from './styled';

const Autocomplete = (props: AutocompleteProps) => {
  return (
    <MuiAutocompleteStyled
      {...props}
      options={[''].concat(props.options)}
      onChange={(e, val) => props.onChange(val)}
      renderInput={(params) => <TextField {...params} label={props.label} size="small" />}
    />
  );
};

export default Autocomplete;

type AutocompleteProps = Omit<
  MuiAutocompleteProps<any, any, any, any>,
  'renderInput'
> & {
  label: string;
  onChange: (val: any) => void | null;
};
