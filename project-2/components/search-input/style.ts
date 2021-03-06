import styled from 'styled-components'

export const StyledLabel = styled.label`
    display: inline-block;
    position: relative;
    font-size: 14px;
    padding: 12px 0;
`

export const StyledInput = styled.input`
    border: none;
    appearance: none;
    background-color: #f2f2f2;
    padding: 18px;
    border-radius: 18px;
    width: 250px;
    outline: none;
    font-size: 14px;

    .dirty + .placeholder,
    :focus + .placeholder,
    :not(:placeholder-shown) + .placeholder {
        top: 0;
        font-size: 10px;
        color: #222;
    }
`

export const StyledPlaceholder = styled.span`
    position: absolute;
    top: 36px;
    left: 30px;
    width: calc(100% - 12 * 2);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 100%;
    transform: translateY(-50%);
    color: #aaa;
    transition:
        top 0.3s ease,
        color 0.3s ease,
        font-size 0.3s ease;
`