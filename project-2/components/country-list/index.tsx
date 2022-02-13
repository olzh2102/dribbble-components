import CountryItem from '../country-item';
import { TCountry } from 'types';
import { StyledCountryList } from './style';

const CountryList = ({
  countries,
  onSelect,
}: {
  countries: TCountry[];
  onSelect: (value: string) => void;
}) => (
  <StyledCountryList>
    {countries.map((country: TCountry, index: number) => (
      <CountryItem key={index} country={country} onSelect={onSelect} />
    ))}
  </StyledCountryList>
);

export default CountryList;
