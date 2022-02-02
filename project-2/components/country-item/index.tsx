import { TCountry } from 'types';
import { CountryInfo, StyledLabel } from './style';

const CountryItem = ({
  country,
  onSelect,
}: {
  country: TCountry;
  onSelect: (val: string) => void;
}) => (
  <StyledLabel>
    <CountryInfo>
      <img src={country.flag} alt="" />
      <span>{country.name}</span>
      <span>
        {country.dialCode &&
          (country.dialCode.startsWith('+')
            ? `(${country.dialCode})`
            : `(+${country.dialCode})`)}
      </span>
    </CountryInfo>
    <input
      type="radio"
      value={country.name}
      name="country"
      onClick={() => onSelect(country.name)}
    />
  </StyledLabel>
);

export default CountryItem;
