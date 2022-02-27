import styled from 'styled-components';

const Box = styled.div<{ state: any }>`
  display: inline-flex;
  flex-direction: ${({ state }) => state.flexDirection};
  position: absolute;
  top: ${({ state }) => state.top};
  left: ${({ state }) => state.left};
  transform: translateX(${({ state }) => state.translateX});

  background-color: ${({ theme }) => theme.colors.secondaryBg};
  border-radius: 8px;
  padding: 12px 0;

  .section {
    display: flex;
    flex-direction: ${({ state }) => state.flexDirection};
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
