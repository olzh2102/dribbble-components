const CountrySelectRadioInput = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) => (
  <input
    type="radio"
    value={value}
    name="country"
    onClick={() => onSelect(value)}
  />
);

export default CountrySelectRadioInput;
