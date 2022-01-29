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
        <StyledLabel>
            <StyledInput 
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