import { StyledLabel, StyledInput, StyledPlaceholder } from './style'

const SearchInput = (
{ 
    onChange, 
    value, 
    placeholder 
}: {
    onChange: (val: string) => void,
    value: string,
    placeholder: string
}) => {
    return (
        <StyledLabel htmlFor="search-input">
            <StyledInput
                id="search-input" 
                data-test-id="search-input"
                type="text" 
                value={value} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
                placeholder="&nbsp;" 
            />
            <StyledPlaceholder className="placeholder">
                {placeholder}
            </StyledPlaceholder>
        </StyledLabel>
    )
}

export default SearchInput;