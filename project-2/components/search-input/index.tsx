import { StyledLabel, StyledInput } from './style'

const SearchInput = (
{ 
    onChange, 
    value, 
    placeholder 
}: {
    onChange: (e: any) => void,
    value: string,
    placeholder: string
}) => {
    return (
        <StyledLabel>
            <StyledInput 
                type="text" 
                value={value} 
                onChange={onChange} 
                placeholder="&nbsp;" 
            />
            <span>Enter</span>
            {/* <StyledPlaceholder>{placeholder}</StyledPlaceholder>
            <StyledBorder /> */}
        </StyledLabel>
    )
}

export default SearchInput;