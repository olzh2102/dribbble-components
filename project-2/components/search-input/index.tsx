import { StyledLabel, StyledInput, StyledPlaceholder } from './style'

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
            <StyledPlaceholder className="placeholder">{placeholder}</StyledPlaceholder>
        </StyledLabel>
    )
}

export default SearchInput;