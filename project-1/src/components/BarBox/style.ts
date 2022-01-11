import styled from 'styled-components';

const Box = styled.div`
  display: inline-flex;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);

  background-color: ${({ theme }) => theme.colors.secondaryBg};
  border-radius: 8px;
  padding: 12px 0;

  .section {
    display: flex;
    gap: 8px;
    padding: 4px 16px;

    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => `${theme.colors.font}15`};
    }

    .items {
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }

    .color-picker {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.selected};
    }
  }
`;

export default Box;
