import styled from 'styled-components';

const StyledShapeSelector = styled.div`
  position: relative;
  width: 32px;

  .shape {
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;

    &:hover {
      background-color: #f0effa;
    }
  }

  .shapes {
    display: inline-flex;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    top: 100%;
    left: 0;
    border-radius: 8px;
    padding: 12px;
    column-gap: 8px;

    div {
      width: 32px;
      height: 32px;
    }
  }
`;

export default StyledShapeSelector;
