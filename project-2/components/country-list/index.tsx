import CountryItem from '../country-item';
import { TCountry } from 'types';
import { StyledCountryList } from './style';

const CountryList = ({
  countries,
  onSelect,
  selectedCountry,
}: {
  countries: TCountry[];
  onSelect: (value: string) => void;
  selectedCountry: TCountry;
}) => (
  <StyledCountryList>
    {countries.map((country: TCountry, index: number) => (
      <CountryItem
        key={index}
        country={country}
        onSelect={onSelect}
        selectedCountry={selectedCountry}
      />
    ))}
  </StyledCountryList>
);

export default CountryList;
