import CheckIcon from '../icons/check';
import { TCountry } from 'types';
import { CountryInfo, StyledLabel } from './style';

const CountryItem = ({
  country,
  onSelect,
  selectedCountry
}: {
  country: TCountry;
  onSelect: (val: string) => void;
  selectedCountry: TCountry;
}) => (
  <StyledLabel>
    <CountryInfo onClick={() => onSelect(country as any)}>
      <img src={country.flag} alt="" />
      <span>{country.name}</span>
      <span>
        {country.dialCode &&
          (country.dialCode.startsWith('+')
            ? `(${country.dialCode})`
            : `(+${country.dialCode})`)}
      </span>
    </CountryInfo>
    {selectedCountry.name == country.name && <div><CheckIcon /></div>}
  </StyledLabel>
);

export default CountryItem;
