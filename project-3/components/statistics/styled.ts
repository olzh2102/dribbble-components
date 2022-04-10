import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)<{ borderColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .recharts-wrapper {
    padding: 20px;
    border-radius: 8px;
    border: ${({ borderColor }) => `2px solid ${borderColor}`};
  }

  .recharts-surface {
    width: 650px;
    height: 215px;
  }
`;
