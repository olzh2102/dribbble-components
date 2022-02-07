import styled from 'styled-components';

export const StyledContainer = styled.div`
    max-width: 322px;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    padding: 20px;
    background-color: #fff;
    gap: 8px;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, 
      rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;

    .actions {
        display: flex;
        align-items: center;
        gap: 16px;

        > a {
            flex-grow: 2;
            text-align: center;
            padding: 16px;
            border-radius: 25px;
            background-color: #005bff;
            color: #fff;
            cursor: pointer;
        }
    }
`
