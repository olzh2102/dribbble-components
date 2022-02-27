import styled from 'styled-components';

export const StyledContainer = styled.div`
    height: 350px;
    max-width: 290px;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    padding: 20px;
    background-color: #fff;
    gap: 8px;
    align-items: center;

    .actions {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;

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
