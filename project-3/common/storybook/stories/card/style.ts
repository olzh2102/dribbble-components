import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Card, Typography } from '@mui/material';

const horizontalCardStyles = css`
  width: 600px;
  height: 300px;
  grid-template-columns: 0.33fr 1fr;
  grid-template-rows: 1fr 1fr;

  .MuiCardMedia-root {
    height: 100%;
    object-fit: cover;
    grid-area: 1 / 2 / 3 / 3;
  }

  .MuiCardHeader-root {
    display: flex;
    align-self: flex-end;
    grid-area: 1 / 1 / 2 / 2;
    margin: 0 auto;
    padding-bottom: 8px;
  }

  .MuiCardContent-root {
    grid-area: 2 / 1 / 3 / 2;
    padding-top: 8px;
    margin: 0 auto;
  }
`;

const verticalCardStyles = css`
  width: 300px;
  height: auto;
  grid-template-columns: 1fr auto;

  .MuiCardHeader-root {
    grid-area: 1 / 1 / 2 / 2;
  }

  .MuiCardContent-root {
    grid-area: 1 / 2 / 2 / 3;
  }

  .MuiCardMedia-root {
    grid-area: 2 / 1 / 3 / 3;
  }
`;

export const StyledCard = styled(Card)<{
  orientation: 'horizontal' | 'vertical';
}>`
  border-radius: 16px;
  box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 4%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);

  display: grid;

  ${({ orientation }) =>
    orientation === 'horizontal' ? horizontalCardStyles : verticalCardStyles};
`;

export const TypographyWithIcon = styled(Typography)`
  display: flex;
  align-items: center;
  column-gap: 6px;

  img {
    width: 32px;
    height: 32px;
  }
`;
