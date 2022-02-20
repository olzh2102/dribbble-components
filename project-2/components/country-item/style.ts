import styled from 'styled-components';

export const StyledLabel = styled.label<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  position: relative;

  border-radius: ${(props) => props.isSelected ? '12px' : 0};
  background-color: ${(props) => props.isSelected ? '#dfdfdf' : 'none'}; 
  padding: ${(props) => props.isSelected ? '8px' : 0};
  transition: all 0.3s;
`;

export const CountryInfo = styled.div`
  display: flex;
  gap: 12px;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;

export const CheckWrapper = styled.div`
  display: flex;
  background-color: #005bff;
  color: white;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  position: absolute;
  top: 12px;
  right: 8px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

  > svg {
    align-self: center;
    height: 16px;
    width: 16px;
  }
`
